# pc-nrfconnect-ppk 源码解析——PPK2功能概述

pc-nrfconnect-ppk 是 Power Profiler Kit II 的御用上位机，所有的界面功能都是围绕 PPK2 的实际能力开发的，因此对于 PPK2 的硬件理解也是读懂源码的一个关键环节。

## PPK2 概述

这里引述 [PPK2 产品介绍](https://www.nordicsemi.cn/tools/ppk2/)中的描述；

Power Profiler Kit II (PPK2)是一个独立的单元，可以测量（同时也可以选择供电）外部硬件以及所有Nordic DK低于uA至高达1A的电流。

PPK2通过一根标准的5V USB电缆供电，可提供高达500mA的电流。如需提供高达1A的电流，需要两根USB电缆。

支持安培表模式以及电源模式(PCB上分别显示为AMP和源测量单元(SMU))。对于安培表模式，外部电源必须向被测设备(DUT)提供0.8-5V的VCC电平。对于电源模式，PPK2提供0.8-5V的VCC电平，板载稳压器为外部应用提供最高1A的电流。除了外部硬件外，还可以测量所有Nordic DK的低睡眠电流、高工作电流以及短路电流峰值。

PPK2可以对nRF51、nRF52和nRF53系列的短距离应用提供支持，除此之外，它在支持nRF91系列蜂窝系统级封装(SiP)外还可以提供额外的电流，例如带有传感器的nRF9160 DK。

PPK2具有一个高动态测量范围的先进模拟测量单元。这使得它可以在低功耗嵌入式应用中的整个范围内精确测量功耗，范围可从μA到1A。根据测量范围的不同，分辨率在100nA到1mA之间，其精度足可以检测在低功耗优化系统中经常看到的小峰值。

PPK2还可以使用数字输入作为简易逻辑分析仪，实现代码同步测量。可以通过将数字输入连接到外部被测设备(DUT)上的I/O引脚来实现。使用此功能前，被测设备必须采用1.6-5.5V的VCC电压供电。然后，数字输入可以显示不同时间点被测设备中执行的代码。

与上一代的长周期采样窗口相比，快10倍的采样率(即100ksps)能够在任何时候实现最大的连续分辨率。这使得用户能够使用同一个采样窗口收集平均采集数据并放大获得高分辨率数据。

PC软件是一个运行在nRF Connect for Desktop框架中的独立Power Profiler应用。此应用既支持原始PPK，也支持PPK2。使用PPK2，Power Profiler应用可以在同一采样窗口中显示平均采集时间和高分辨率事件。测量数据可以导出进行后期处理。

## 软件描述

在 pc-nrfconnect-ppk 源码中，使用 SerialDevice 类对 PPK2 进行描述，我们将其按照参数定义和功能接口两部分进行逐一介绍。

### 参数定义

SerialDevice 的配置参数定义如下所示：

```typescript
class SerialDevice extends Device {
    public modifiers: modifiers = {
        r: [1031.64, 101.65, 10.15, 0.94, 0.043],
        gs: [1, 1, 1, 1, 1],
        gi: [1, 1, 1, 1, 1],
        o: [0, 0, 0, 0, 0],
        s: [0, 0, 0, 0, 0],
        i: [0, 0, 0, 0, 0],
        ug: [1, 1, 1, 1, 1],
    };

    public adcSamplingTimeUs = 10;
    public resistors = { hi: 1.8, mid: 28, lo: 500 };
    public vdd = 5000;
    public vddRange = { min: 800, max: 5000 };
    public triggerWindowRange = { min: 1, max: 100 };
    public isRunningInitially = false;

    private adcMult = 1.8 / 163840;

    // This are all declared to make typescript aware of their existence.
    private spikeFilter;
    private path;
    private child;
    private parser: any;
    private expectedCounter: null | number;
    private dataLossCounter: number;
    private corruptedSamples: { value: number; bits: number }[];
    private rollingAvg: undefined | number;
    private rollingAvg4: undefined | number;
    private prevRange: undefined | number;
    private afterSpike: undefined | number;
    private consecutiveRangeSample: undefined | number;
}
```

其中前半部分自带初值的参数为 PPK2 硬件性能参数，后半部分为软件实现中设定的参数，这里我们着重对前半部分进行简要说明。

- modifiers：用于电路参数的微调
  - r：5个采样电阻的阻值
  - gs、gi、o、s、i、ug：不知道是啥，但是估计和上面的5个采样电阻相关
- adcSamplingTimeUs：adc 采样时间，10us 这也是采样率 100K 的来源（100K*10us = 1s）
- resistors：也是个电阻，里面记录了三个阻值，不知道干嘛的
- vdd：电源电压 5V（默认值？）
- vddRange：输出电压的工作范围（800mV~5000mV）
- triggerWindowRange：出发窗口的范围（1~100），不知道干啥的
- isRunningInitially：无限运行？
- adcMult：1.8 / 163840 （16384 = 2^14）这里猜测是一个14位的 ADC

### 功能接口

SerialDevice 的功能接口如下所示：

```typescript
class SerialDevice extends Device {
    // 构造函数，传入 device 和采样回调函数
    constructor( device: SharedDevice, onSampleCallback: (values: SampleValues) => void);

    // 真正意义上的对外接口，有实际的外部调用者
    start();
    stop();
    parseMeta(meta: any): any;
    // Capability methods
    ppkSetPowerMode(isSmuMode: boolean): Promise<unknown>;
    ppkSetUserGains(range: number, gain: number): Promise<unknown>;
    ppkSetSpikeFilter(spikeFilter: SpikeFilter): void;
    ppkAverageStart();

    // 同样被申明在 Device基类 中，但是并没有外部调用者
    sendCommand(...args: PPKCmd[]): Promise<unknown> | undefined;

    // 仅内部调用的函数
    getMetadata();
    // parser
    getAdcResult(range: number, adcVal: number): number;
    handleRawDataSet(adcValue: number);
    parseMeasurementData(buf: Buffer);
    // other
    resetDataLossCounter();
    dataLossReport(missingSamples: number);
}
```

接口说明已在上面的注释中有所体现，这里不过多赘述。

## 功能实现

### 骨架功能的实现

```typescript
class SerialDevice extends Device {

    private child;
    private parser: any;

    constructor(
        device: SharedDevice,
        onSampleCallback: (values: SampleValues) => void
    ) {
        super(onSampleCallback);

        this.parser = null;
        this.child = fork(
            path.resolve(getAppDir(), 'worker', 'serialDevice.js')
        );
        this.child.on('message', (message: serialDeviceMessage) => {
            this.parser(Buffer.from(message.data));
        });
    }

    start() {
        this.child.send({ open: this.path });
        return this.getMetadata();
    }

    stop() {
        this.child.kill();
    }

    sendCommand(cmd: PPKCmd) {
        this.child.send({ write: cmd });
        return Promise.resolve(cmd.length);
    }

    handleRawDataSet(adcValue: number) {
        let value = 0, bits = 0;
        this.onSampleCallback({ value, bits });
    }

    parseMeasurementData(buf: Buffer) {
        this.handleRawDataSet(buf);
    }

    getMetadata() {
        let metadata = '';
        return (
            new Promise(resolve => {
                this.parser = (data: Buffer) => {
                    metadata = `${metadata}${data}`;
                    this.parser = this.parseMeasurementData.bind(this);
                    resolve(metadata);
                };
                this.sendCommand([PPKCmd.GetMetadata]);
            }).then(meta);
        )
    }
}
```

骨架功能的实现围绕 worker 和 parser 展开：worker 负责创建一个独立线程，下发控制命令并接收原始采样数据，parser 负责解析原始采样数据并输送给上层应用；

#### worker

TODO：使用流程图说明 cmd 和 message 的流转；

精简过后的 serialDevice.js 代码：

```javascript
const { SerialPort } = require('serialport');

let port = null;
process.on('message', msg => {
    if (msg.open) {
        console.log('\x1b[2J'); // ansi clear screen
        process.send({ opening: msg.open });
        port = new SerialPort({
            path: msg.open,
            autoOpen: false,
            baudRate: 115200,
        });

        let data = Buffer.alloc(0);
        port.on('data', buf => {
            data = Buffer.concat([data, buf]);
        });
        setInterval(() => {
            if (data.length === 0) return;
            process.send(data.slice(), err => {
                if (err) console.log(err);
            });
            data = Buffer.alloc(0);
        }, 30);
        port.open(err => {
            if (err) {
                process.send({ error: err.toString() });
            }
            process.send({ started: msg.open });
        });
    }
    if (msg.write) {
        port.write(msg.write, err => {
            if (err) {
                process.send({ error: 'PPK command failed' });
            }
        });
    }
});

process.on('disconnect', () => {
    console.log('parent process disconnected, cleaning up');
    if (port) {
        port.close(process.exit);
    } else {
        process.exit();
    }
});

```

#### parser

TODO：分为几个部分进行：

- meta
- value
  - get raw data（adc value）
  - concat into raw data set
  - convert adc value to current value
- bits

### 其它功能

#### data loss

TODO