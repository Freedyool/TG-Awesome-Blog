# 基础外设

在嵌入式系统领域，常见的外设（或外部设备）通常用于与微控制器或处理器进行交互，以满足不同的输入、输出、存储、通信等功能需求。以下是嵌入式系统中一些常见的外设：

### 1. **存储类外设**
   - **EEPROM（Electrically Erasable Programmable Read-Only Memory）**：
     - 一种非易失性存储器，常用于存储配置数据或校准数据。
   - **Flash存储器**：
     - 提供更大的存储空间，可用于固件存储、数据记录等应用。包括内部Flash和外部Flash。
   - **SD卡**：
     - 常用于数据记录、存储大容量文件和多媒体内容。通过SDIO或SPI接口连接到微控制器。
   - **RAM（Random Access Memory）**：
     - 用于存储运行时数据和代码。嵌入式系统通常使用SRAM或DRAM。
   - **NOR/NAND Flash**：
     - NOR Flash用于代码执行，支持快速读取。NAND Flash用于数据存储，成本低，容量大。
     
### 2. **通信类外设**
   - **UART（通用异步收发传输器）**：
     - 用于异步串行通信，适合短距离、点对点的设备通信。
   - **SPI（串行外设接口）**：
     - 用于高速数据通信，如与Flash存储、传感器或显示器通信。
   - **I2C（Inter-Integrated Circuit）**：
     - 支持多从设备的低速通信，常用于传感器、EEPROM、显示模块等设备。
   - **CAN（控制器局域网）**：
     - 广泛应用于汽车电子和工业自动化中，用于设备之间的可靠通信。
   - **以太网控制器**：
     - 用于实现网络连接，使嵌入式设备能够通过TCP/IP协议通信。
   - **USB（通用串行总线）**：
     - 用于与外围设备通信，例如键盘、鼠标、U盘等。
   - **无线通信模块（Wi-Fi、Bluetooth、LoRa、Zigbee、NB-IoT等）**：
     - 实现无线数据传输，适用于物联网和远程监控应用。

### 3. **输入类外设**
   - **按键/开关**：
     - 最常见的用户输入设备，用于提供简单的用户界面控制。
   - **触摸屏**：
     - 用于更复杂的用户界面，常用于人机界面（HMI）和消费类电子产品。
   - **键盘矩阵**：
     - 适合需要多个按键的场景，例如仪表和数控设备。
   - **模拟输入（ADC）**：
     - 模拟-数字转换器，用于将模拟信号（如温度、光线强度）转换为数字信号。
   - **摄像头模块**：
     - 用于图像采集和处理，适合嵌入式视觉应用。
   - **旋转编码器**：
     - 检测旋转角度或位置，常用于电机控制和位置反馈。

### 4. **输出类外设**
   - **LED显示屏**：
     - 包括单色LED、数码管、LCD、OLED等显示器，用于显示信息。
   - **蜂鸣器**：
     - 用于产生警报声或提示音，常用于提示信息。
   - **继电器/电机驱动**：
     - 控制大电流负载或电机，常用于自动化控制和机械驱动。
   - **DAC（数字-模拟转换器）**：
     - 将数字信号转换为模拟信号，用于产生电压或声音信号。
   - **H桥电机驱动器**：
     - 用于驱动直流电机和步进电机，支持电机的正反转控制。

### 5. **传感器类外设**
   - **温度传感器（如NTC、PTC、LM35等）**：
     - 用于检测温度变化，在环境监测和设备监控中应用广泛。
   - **加速度计和陀螺仪**：
     - 用于检测运动和旋转变化，广泛应用于手机、手环和无人机等设备。
   - **压力传感器**：
     - 用于检测压力变化，适合流量监测和气压监测。
   - **光线传感器**：
     - 检测环境光线强度，适用于自动亮度调节和光感设备。
   - **气体传感器**：
     - 用于检测空气质量和特定气体成分，如二氧化碳、可燃气体等。
   - **红外传感器**：
     - 用于距离测量或物体检测，常用于遥控和距离传感器。

### 6. **人机界面外设**
   - **LCD/LED/OLED显示屏**：
     - 用于图形或文本显示，适合嵌入式设备的用户界面。
   - **触摸屏**：
     - 结合显示屏，实现触控输入功能，用于更复杂的人机交互。
   - **七段显示器**：
     - 用于简单的数值或字符显示，适合电子计数器、时钟等设备。
   - **键盘**：
     - 用于简单的人机交互，通常是矩阵键盘或物理按钮。
   
### 7. **电源管理外设**
   - **LDO（低压差稳压器）**：
     - 稳压器，用于将高电压转换为低电压，以稳定嵌入式系统的电源。
   - **DC-DC转换器**：
     - 用于电源电压的转换，适合需要高效能量管理的设备。
   - **电池管理芯片（BMS）**：
     - 管理电池的充电和放电，保护电池并延长其使用寿命。
   - **电源监控芯片**：
     - 用于监控系统电源电压，适合需要低功耗和节能模式的应用。

### 8. **定时和时钟外设**
   - **RTC（实时时钟）**：
     - 提供时间和日期信息，用于需要时间跟踪的应用，如日志记录。
   - **看门狗定时器**：
     - 监控系统运行，防止程序卡死。定期复位，否则系统自动重启。
   - **PWM（脉宽调制）**：
     - 控制电机速度、LED亮度等的模块，通过调节占空比控制输出。

### 9. **安全与加密外设**
   - **加密模块（AES、DES等）**：
     - 提供硬件加密功能，适合需要数据保护和安全的嵌入式系统。
   - **安全存储模块**：
     - 存储加密密钥、证书等敏感信息，用于增强系统的安全性。
   - **指纹识别模块**：
     - 用于身份认证和访问控制，常用于门禁和个人设备安全。
   
### 10. **调试和编程外设**
   - **JTAG（联合测试行动小组）**：
     - 用于调试和编程，适合嵌入式设备的故障排查和固件更新。
   - **SWD（串行线调试）**：
     - ARM Cortex系列处理器的调试协议，使用两条线进行调试。
   - **串行编程接口**：
     - 用于烧录固件和调试，通常包括UART、SPI等接口。

### 11. **位置检测外设**
   - **GPS模块**：
     - 提供地理位置和时间信息，适合定位和导航应用。
   - **电子罗盘**：
     - 检测设备的方位，用于无人机、机器人等设备的导航系统。

嵌入式系统中的外设选择通常取决于应用需求、成本和系统的复杂性。通过合适的外设组合，可以实现多种功能，满足从简单控制到复杂数据处理的各种应用场景。