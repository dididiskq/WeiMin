# 首页内容配置说明

本文件用于指导非技术人员如何修改首页内容配置文件，无需编写代码即可更新网站文字、图片和视频。

## 配置文件位置

配置文件位于：`src/config/home.config.js`

## 如何修改配置

您可以使用任何文本编辑器（如记事本、VS Code等）打开配置文件进行修改。修改后保存文件，网站会自动更新显示内容。

## 配置项说明

### 1. 英雄区域配置 (`hero`)

```javascript
hero: {
  title: '深圳市为民可靠性系统工程研究院', // 主标题
  subtitle: '确性可靠性 · 赋能中国制造企业 · 服务创新科技 · 普惠中国智造', // 副标题
  video: '/videos/background.mp4', // 背景视频路径
  logo: '@/assets/logo.svg', // logo图片路径
  websiteImage: '@/assets/changm.png', // 场鸣职业课图片路径
  wechatQrcode: '@/assets/gzh.png', // 微信公众号二维码图片路径
},
```

### 2. 最新资讯轮播图配置 (`newsSlider`)

```javascript
newsSlider: [
  {
    image: '@/assets/1.png', // 图片路径
    caption: 'AI大模型在复杂推理任务上超越人类专家水平' // 图片说明文字
  },
  // 更多轮播项...
],
```

### 3. 专家团队配置 (`expertTeam`)

```javascript
expertTeam: [
  {
    name: '张明', // 专家姓名
    position: '可靠性工程专家', // 专家职位
    description: '15年工业可靠性研究经验，曾主导多项国家级可靠性项目。', // 专家简介
    backgroundColor: '#dcfce7' // 照片背景色
  },
  // 更多专家...
],
```

### 4. 技术服务配置 (`services`)

```javascript
services: [
  { id: '01', title: '可靠性工程师培训' }, // 服务ID和标题
  // 更多服务...
],
```

### 5. 知识产权和智库配置 (`intellectualProperty`)

```javascript
intellectualProperty: [
  {
    title: '技术标准', // 标题
    description: '制定行业可靠性测试标准与评估体系，涵盖电子、机械、软件等多领域', // 描述
    backgroundColor: '#dbeafe' // 背景色
  },
  // 更多项...
],
```

### 6. 品牌活动配置 (`brandActivities`)

```javascript
brandActivities: [
  {
    date: '2023.12.15', // 活动日期
    title: '2023可靠性工程国际研讨会', // 活动标题
    description: '汇聚全球可靠性领域专家，探讨前沿技术与应用案例', // 活动描述
    tag: '国际会议' // 活动标签
  },
  // 更多活动...
],
```

### 7. 项目案例配置 (`projectCases`)

```javascript
projectCases: [
  {
    title: '汽车电子可靠性测试平台', // 案例标题
    description: '为某汽车电子企业构建全生命周期可靠性测试解决方案', // 案例描述
    backgroundColor: '#dbeafe' // 背景色
  },
  // 更多案例...
],
```

### 8. 合作机构配置 (`cooperationAgencies`)

```javascript
cooperationAgencies: [
  {
    id: '01', // 机构ID
    title: '发起单位', // 机构标题
    description: '联合行业领军企业共同发起成立，推动可靠性技术标准化与产业化应用', // 机构描述
    backgroundColor: '#3b82f6' // 背景色
  },
  // 更多机构...
],
```

### 9. 重要链接配置 (`importantLinks`)

```javascript
importantLinks: [
  { name: 'NVIDIA', backgroundColor: '#dbeafe' }, // 链接名称和背景色
  // 更多链接...
],
```

## 替换图片和视频

1. 将新图片或视频文件复制到 `src/assets/` 或 `public/videos/` 文件夹
2. 在配置文件中更新对应的路径

例如，替换第一张轮播图：
```javascript
image: '@/assets/new-image.jpg', // 新图片路径
```

## 注意事项

1. 修改配置文件时请保持原有的格式和结构
2. 图片路径使用 `@/assets/文件名` 格式
3. 视频路径使用 `/videos/文件名` 格式
4. 保存修改后，刷新网页即可看到更新效果
5. 如果不确定如何修改，请先备份配置文件

如有任何问题，请联系技术支持。