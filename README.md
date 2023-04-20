<div align="center">
<h2>NodePacs - 数字化 DICOM 协议解析平台</h2>

<p>🌏完全基于 Node.js 设计，前后端一体开发，提供强劲的 DICOM 数据沟通能力，支持多种CT机进行数据解析。</p>
</div>

---

## 前端 - Frontend

使用 Node.js + React 框架开发，根据后端数据库中内容向用户展示特定的 DICOM 统计数据

- 通过文字、图形等多种信息模式展示统计数据
- 支持从前端（网页、APP）批量补充 DICOM 数据
- 为网站管理员提供统计数据管理操作支持

## 后端 - Backend

使用 Node.js + Koa + DicomParser + MySQL 开发

支持从 <本地文件、网络链路> 接受 DICOM 协议文件入库，转换为剂量报告数据

- 提供 CT 机文件流热更新的支持&维护
- 支持定期轮询本地文件入库，自动检测去重