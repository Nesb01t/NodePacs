## Dicommon - 数字 DCM 平台工作流

基于 Java 语言设计，提供强劲的 DICOM 协议数据沟通能力，支持通用 CT 机数据解析。

> 支持前端 Frontend

- 以文件、图形等多种信息渠道展示数据内容

> 支持后端 Backend

- 提供 CT 机文件流热更新的支持和维护

---

## 前端部分 Frontend - React

使用 react 进行开发，根据后端数据库中信息，向用户展示特定的现存 DCM 条目

---

## 后端部分 Backend - Node.js

使用 Node.js + Koa + DicomParser + MySQL 开发

支持从 <本地文件、网络空间> 接受 DICOM 协议文件入库，转换为剂量报告数据
