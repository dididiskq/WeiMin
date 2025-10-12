<template>
  <div class="config-manager-container">
    <div class="header-actions">
      <h1>网站内容管理</h1>
      <button class="logout-btn" @click="logout">登出</button>
    </div>

    <!-- 导航标签 -->
    <div class="navigation-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="switchTab(tab.id)"
      >
        {{ tab.name }}
      </button>
    </div>
    
    <!-- 最新咨询配置 -->
    <div v-if="activeTab === 'latest-news'" class="config-content">
      <section class="config-section">
        <h2>最新咨询管理</h2>
        
        <!-- 操作按钮 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddNews">
            ✚ 添加咨询
          </button>
        </div>
        
        <!-- 编辑/添加表单 -->
        <div v-if="isEditing" class="news-edit-form">
          <h3>{{ currentNews.id ? '编辑咨询' : '添加咨询' }}</h3>
          
          <div class="form-group">
            <label>标题 <span class="required">*</span></label>
            <input type="text" v-model="currentNews.title" placeholder="输入咨询标题" />
          </div>
          
          <div class="form-row">
            <div class="form-group half">
              <label>发布日期 <span class="required">*</span></label>
              <input type="date" v-model="currentNews.date" />
            </div>
            <div class="form-group half">
              <label>分类 <span class="required">*</span></label>
              <select v-model="currentNews.category">
                <option value="行业动态">行业动态</option>
                <option value="机构动态">机构动态</option>
                <option value="学术交流">学术交流</option>
                <option value="技术分享">技术分享</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label>摘要 <span class="required">*</span></label>
            <textarea v-model="currentNews.summary" placeholder="输入咨询摘要（简短描述）"></textarea>
          </div>
          
          <div class="form-group">
            <label>详细内容 <span class="required">*</span></label>
            <textarea v-model="currentNews.content" placeholder="输入咨询详细内容，使用空行分隔段落"></textarea>
          </div>
          
          <div class="form-group">
            <label>封面图片</label>
            <input type="file" @change="handleNewsImageUpload" />
            <div v-if="newsImage" class="preview">
              <img :src="newsImage" alt="封面图片预览" />
            </div>
          </div>
          
          <div class="form-actions">
            <button class="save-button" @click="saveNews">保存</button>
            <button class="cancel-button" @click="cancelEdit">取消</button>
          </div>
        </div>
        
        <!-- 咨询列表 -->
        <div v-else class="news-list">
          <div class="list-header">
            <span>标题</span>
            <span>日期</span>
            <span>分类</span>
            <span>操作</span>
          </div>
          
          <div v-for="news in newsItems" :key="news.id" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ news.title }}</div>
              <div class="news-summary-text">{{ news.summary }}</div>
            </div>
            <div class="news-date-cell">{{ news.date }}</div>
            <div class="news-category-cell">{{ news.category }}</div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditNews(news)">编辑</button>
              <button class="delete-button" @click="deleteNews(news.id)">删除</button>
            </div>
          </div>
          
          <div v-if="newsItems.length === 0" class="no-news">
            <p>暂无咨询数据，请点击"添加咨询"按钮添加内容。</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 首页配置 -->
    <div v-if="activeTab === 'home'" class="config-content">
      <section class="config-section">
        <h2>首页基础信息</h2>
        
        <div class="form-group">
          <label>网站标题</label>
          <input type="text" v-model="config.hero.title" placeholder="输入网站大标题" />
        </div>
        
        <div class="form-group">
          <label>网站副标题</label>
          <input type="text" v-model="config.hero.subtitle" placeholder="输入网站副标题" />
        </div>
        
        <div class="form-group">
          <label>网站Logo</label>
          <input type="file" @change="handleImageUpload('hero', 'logo')" />
          <div v-if="config.hero.logo" class="preview">
            <img :src="config.hero.logo" alt="Logo预览" />
          </div>
        </div>
        
        <div class="form-group">
          <label>网站图片</label>
          <input type="file" @change="handleImageUpload('hero', 'websiteImage')" />
          <div v-if="config.hero.websiteImage" class="preview">
            <img :src="config.hero.websiteImage" alt="网站图片预览" />
          </div>
        </div>
        
        <div class="form-group">
          <label>微信公众号二维码</label>
          <input type="file" @change="handleImageUpload('hero', 'wechatQrcode')" />
          <div v-if="config.hero.wechatQrcode" class="preview">
            <img :src="config.hero.wechatQrcode" alt="微信二维码预览" />
          </div>
        </div>
      </section>

      <section class="config-section">
        <h2>首页轮播图</h2>
        <div v-for="(item, index) in config.newsSlider" :key="index" class="content-item">
          <h3>轮播图 {{ index + 1 }}</h3>
          <div class="form-group">
            <label>图片</label>
            <input type="file" @change="handleArrayImageUpload('newsSlider', index, 'image')" />
            <div v-if="item.image" class="preview">
              <img :src="item.image" alt="轮播图预览" />
            </div>
          </div>
          <div class="form-group">
            <label>文字说明</label>
            <input type="text" v-model="item.caption" placeholder="输入轮播图文字" />
          </div>
        </div>
      </section>
    </div>

    <!-- 专家团队配置 -->
    <div v-if="activeTab === 'expert-team'" class="config-content">
      <section class="config-section">
        <h2>专家团队配置</h2>
        
        <!-- 专家编辑表单 -->
        <div v-if="isEditingExpert" class="news-edit-form">
          <h3>{{ currentExpert ? '编辑专家' : '添加专家' }}</h3>
          <div class="form-group">
            <label>姓名 <span class="required">*</span></label>
            <input type="text" v-model="currentExpert.name" placeholder="请输入专家姓名" />
          </div>
          <div class="form-group">
            <label>职位 <span class="required">*</span></label>
            <input type="text" v-model="currentExpert.position" placeholder="请输入职位" />
          </div>
          <div class="form-group">
            <label>个人简介 <span class="required">*</span></label>
            <textarea v-model="currentExpert.description" rows="4" placeholder="请输入专家简介"></textarea>
          </div>
          <div class="form-group">
            <label>背景颜色</label>
            <input type="color" v-model="currentExpert.backgroundColor" />
          </div>
          <div class="form-actions">
            <button class="save-button" @click="saveExpert">保存</button>
            <button class="cancel-button" @click="cancelEditExpert">取消</button>
          </div>
        </div>
        
        <!-- 专家列表 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddExpert">添加专家</button>
        </div>
        
        <div class="news-list">
          <div class="list-header">
            <div>专家姓名</div>
            <div>职位</div>
            <div>简介预览</div>
            <div>操作</div>
          </div>
          <div v-for="(expert, index) in config.expertTeam" :key="index" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ expert.name }}</div>
            </div>
            <div class="news-date-cell">{{ expert.position || '-' }}</div>
            <div class="news-summary-text">{{ expert.description || '-' }}</div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditExpert(index)">编辑</button>
              <button class="delete-button" @click="confirmDeleteExpert(index)">删除</button>
            </div>
          </div>
          <div v-if="config.expertTeam.length === 0" class="no-news">暂无专家数据，请点击添加专家按钮开始添加</div>
        </div>
      </section>
    </div>

    <!-- 技术服务配置 -->
    <div v-if="activeTab === 'services'" class="config-content">
      <section class="config-section">
        <h2>技术服务配置</h2>
        
        <!-- 服务编辑表单 -->
        <div v-if="isEditingService" class="news-edit-form">
          <h3>{{ currentService ? '编辑服务' : '添加服务' }}</h3>
          <div class="form-group">
            <label>服务名称 <span class="required">*</span></label>
            <input v-model="currentService.name" type="text" placeholder="请输入服务名称">
          </div>
          <div class="form-group">
            <label>服务描述 <span class="required">*</span></label>
            <textarea 
              v-model="currentService.description" 
              rows="4" 
              placeholder="请输入详细的服务描述，帮助用户了解服务内容和价值"
              maxlength="500"
              @input="autoResizeTextarea"
              ref="serviceDescriptionTextarea"
              class="service-description-textarea"
            ></textarea>
              <div class="char-count">{{ (currentService.description || '').length }}/500</div>
          </div>
          <div class="form-group">
            <label>服务图标</label>
            <input type="file" accept="image/*" @change="handleServiceImageUpload">
            <div v-if="currentService.icon" class="preview">
              <img :src="currentService.icon" alt="服务图标" style="max-width: 100px; max-height: 100px;">
            </div>
          </div>
          <div class="form-actions">
            <button class="save-button" @click="saveService">保存</button>
            <button class="cancel-button" @click="cancelEditService">取消</button>
          </div>
        </div>
        
        <!-- 服务列表 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddService">添加服务</button>
          <button class="reset-button" @click="resetToDefaultServices">重置为默认配置</button>
        </div>
        
        <div class="news-list">
          <div class="list-header">
            <div>服务名称</div>
            <div>描述预览</div>
            <div>图标</div>
            <div>操作</div>
          </div>
          <div v-for="(service, index) in config.services" :key="index" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ service.name || service.title }}</div>
            </div>
            <div class="news-summary-text">{{ service.description || '-' }}</div>
            <div class="news-date-cell">{{ service.icon ? '✓ 已上传' : '-' }}</div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditService(index)">编辑</button>
              <button class="delete-button" @click="confirmDeleteService(index)">删除</button>
            </div>
          </div>
          <div v-if="config.services.length === 0" class="no-news">暂无服务数据，请点击添加服务按钮开始添加</div>
        </div>
      </section>
    </div>

    <!-- 品牌活动配置 -->
    <div v-if="activeTab === 'brand-activities'" class="config-content">
      <section class="config-section">
        <h2>品牌活动管理</h2>
        
        <!-- 活动编辑表单 -->
        <div v-if="isEditingActivity" class="news-edit-form">
          <h3>{{ currentActivity ? '编辑活动' : '添加活动' }}</h3>
          <div class="form-group">
            <label>活动标题 <span class="required">*</span></label>
            <input v-model="currentActivity.title" type="text" placeholder="请输入活动标题">
          </div>
          <div class="form-group">
            <label>活动日期 <span class="required">*</span></label>
            <input v-model="currentActivity.date" type="text" placeholder="输入活动日期，如：2024.12.31">
          </div>
          <div class="form-group">
            <label>活动标签</label>
            <input v-model="currentActivity.tag" type="text" placeholder="输入活动标签，如：培训课程">
          </div>
          <div class="form-group">
            <label>活动描述 <span class="required">*</span></label>
            <textarea v-model="currentActivity.description" rows="4" placeholder="请输入活动描述"></textarea>
          </div>
          <div class="form-actions">
            <button class="save-button" @click="saveActivity">保存</button>
            <button class="cancel-button" @click="cancelEditActivity">取消</button>
          </div>
        </div>
        
        <!-- 活动列表 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddActivity">添加活动</button>
        </div>
        
        <div class="news-list">
          <div class="list-header">
            <div>活动标题</div>
            <div>活动日期</div>
            <div>活动标签</div>
            <div>描述预览</div>
            <div>操作</div>
          </div>
          <div v-for="(activity, index) in config.brandActivities" :key="index" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ activity.title }}</div>
            </div>
            <div class="news-date-cell">{{ activity.date || '-' }}</div>
            <div class="news-date-cell">{{ activity.tag || '-' }}</div>
            <div class="news-summary-text">{{ activity.description || '-' }}</div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditActivity(index)">编辑</button>
              <button class="delete-button" @click="confirmDeleteActivity(index)">删除</button>
            </div>
          </div>
          <div v-if="config.brandActivities.length === 0" class="no-news">暂无活动数据，请点击添加活动按钮开始添加</div>
        </div>
      </section>
    </div>

    <!-- 知识产权配置 -->
    <div v-if="activeTab === 'intellectual-property'" class="config-content">
      <section class="config-section">
        <h2>知识产权管理</h2>
        
        <!-- 知识产权编辑表单 -->
        <div v-if="isEditingIP" class="news-edit-form">
          <h3>{{ currentIP ? '编辑知识产权' : '添加知识产权' }}</h3>
          <div class="form-group">
            <label>标题 <span class="required">*</span></label>
            <input v-model="currentIP.title" type="text" placeholder="请输入知识产权标题">
          </div>
          <div class="form-group">
            <label>描述 <span class="required">*</span></label>
            <textarea v-model="currentIP.description" rows="4" placeholder="请输入知识产权描述"></textarea>
          </div>
          <div class="form-group">
            <label>背景颜色</label>
            <input type="color" v-model="currentIP.backgroundColor">
          </div>
          <div class="form-actions">
            <button class="save-button" @click="saveIP">保存</button>
            <button class="cancel-button" @click="cancelEditIP">取消</button>
          </div>
        </div>
        
        <!-- 知识产权列表 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddIP">添加知识产权</button>
        </div>
        
        <div class="news-list">
          <div class="list-header">
            <div>标题</div>
            <div>描述预览</div>
            <div>背景颜色</div>
            <div>操作</div>
          </div>
          <div v-for="(item, index) in config.intellectualProperty" :key="index" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ item.title }}</div>
            </div>
            <div class="news-summary-text">{{ item.description || '-' }}</div>
            <div class="news-date-cell" v-if="item.backgroundColor">
              <div :style="{ backgroundColor: item.backgroundColor, width: '20px', height: '20px', display: 'inline-block' }"></div>
              {{ item.backgroundColor }}
            </div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditIP(index)">编辑</button>
              <button class="delete-button" @click="confirmDeleteIP(index)">删除</button>
            </div>
          </div>
          <div v-if="config.intellectualProperty.length === 0" class="no-news">暂无知识产权数据，请点击添加知识产权按钮开始添加</div>
        </div>
      </section>
    </div>

    <!-- 项目案例配置 -->
    <div v-if="activeTab === 'project-cases'" class="config-content">
      <section class="config-section">
        <h2>项目案例管理</h2>
        
        <!-- 项目编辑表单 -->
        <div v-if="isEditingProject" class="news-edit-form">
          <h3>{{ currentProject ? '编辑项目' : '添加项目' }}</h3>
          <div class="form-group">
            <label>项目名称 <span class="required">*</span></label>
            <input v-model="currentProject.title" type="text" placeholder="请输入项目名称">
          </div>
          <div class="form-group">
            <label>项目描述 <span class="required">*</span></label>
            <textarea v-model="currentProject.description" rows="4" placeholder="请输入项目描述"></textarea>
          </div>
          <div class="form-group">
            <label>背景颜色</label>
            <input type="color" v-model="currentProject.backgroundColor">
          </div>
          <div class="form-actions">
            <button class="save-button" @click="saveProject">保存</button>
            <button class="cancel-button" @click="cancelEditProject">取消</button>
          </div>
        </div>
        
        <!-- 项目列表 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddProject">添加项目</button>
        </div>
        
        <div class="news-list">
          <div class="list-header">
            <div>项目名称</div>
            <div>描述预览</div>
            <div>背景颜色</div>
            <div>操作</div>
          </div>
          <div v-for="(project, index) in config.projectCases" :key="index" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ project.title }}</div>
            </div>
            <div class="news-summary-text">{{ project.description || '-' }}</div>
            <div class="news-date-cell" v-if="project.backgroundColor">
              <div :style="{ backgroundColor: project.backgroundColor, width: '20px', height: '20px', display: 'inline-block' }"></div>
              {{ project.backgroundColor }}
            </div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditProject(index)">编辑</button>
              <button class="delete-button" @click="confirmDeleteProject(index)">删除</button>
            </div>
          </div>
          <div v-if="config.projectCases.length === 0" class="no-news">暂无项目数据，请点击添加项目按钮开始添加</div>
        </div>
      </section>
    </div>

    <!-- 合作机构配置 -->
    <div v-if="activeTab === 'cooperation-agencies'" class="config-content">
      <section class="config-section">
        <h2>合作机构管理</h2>
        
        <!-- 机构编辑表单 -->
        <div v-if="isEditingAgency" class="news-edit-form">
          <h3>{{ currentAgency ? '编辑机构' : '添加机构' }}</h3>
          <div class="form-group">
            <label>编号</label>
            <input type="text" v-model="currentAgency.id" placeholder="输入编号" />
          </div>
          <div class="form-group">
            <label>机构名称 <span class="required">*</span></label>
            <input v-model="currentAgency.title" type="text" placeholder="请输入机构名称">
          </div>
          <div class="form-group">
            <label>机构描述</label>
            <textarea v-model="currentAgency.description" placeholder="输入机构描述"></textarea>
          </div>
          <div class="form-group">
            <label>背景颜色</label>
            <input type="color" v-model="currentAgency.backgroundColor" />
          </div>
          <div class="form-actions">
            <button class="save-button" @click="saveAgency">保存</button>
            <button class="cancel-button" @click="cancelEditAgency">取消</button>
          </div>
        </div>
        
        <!-- 机构列表 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddAgency">添加机构</button>
        </div>
        
        <div class="news-list">
          <div class="list-header">
            <div>机构名称</div>
            <div>编号</div>
            <div>描述预览</div>
            <div>操作</div>
          </div>
          <div v-for="(agency, index) in config.cooperationAgencies" :key="index" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ agency.title }}</div>
            </div>
            <div class="news-date-cell">{{ agency.id || '-' }}</div>
            <div class="news-summary-text">{{ agency.description || '-' }}</div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditAgency(index)">编辑</button>
              <button class="delete-button" @click="confirmDeleteAgency(index)">删除</button>
            </div>
          </div>
          <div v-if="config.cooperationAgencies.length === 0" class="no-news">暂无机构数据，请点击添加机构按钮开始添加</div>
        </div>
      </section>

      <section class="config-section">
        <h2>重要链接管理</h2>
        
        <!-- 链接编辑表单 -->
        <div v-if="isEditingLink" class="news-edit-form">
          <h3>{{ currentLink ? '编辑链接' : '添加链接' }}</h3>
          <div class="form-group">
            <label>链接名称 <span class="required">*</span></label>
            <input v-model="currentLink.name" type="text" placeholder="请输入链接名称">
          </div>
          <div class="form-group">
            <label>背景颜色</label>
            <input type="color" v-model="currentLink.backgroundColor" />
          </div>
          <div class="form-actions">
            <button class="save-button" @click="saveLink">保存</button>
            <button class="cancel-button" @click="cancelEditLink">取消</button>
          </div>
        </div>
        
        <!-- 链接列表 -->
        <div class="news-actions">
          <button class="add-button" @click="startAddLink">添加链接</button>
        </div>
        
        <div class="news-list">
          <div class="list-header">
            <div>链接名称</div>
            <div>背景颜色</div>
            <div>操作</div>
          </div>
          <div v-for="(link, index) in config.importantLinks" :key="index" class="news-list-item">
            <div class="news-title-cell">
              <div class="news-title-text">{{ link.name }}</div>
            </div>
            <div class="news-date-cell" v-if="link.backgroundColor">
              <div :style="{ backgroundColor: link.backgroundColor, width: '20px', height: '20px', display: 'inline-block' }"></div>
              {{ link.backgroundColor }}
            </div>
            <div class="news-actions-cell">
              <button class="edit-button" @click="startEditLink(index)">编辑</button>
              <button class="delete-button" @click="confirmDeleteLink(index)">删除</button>
            </div>
          </div>
          <div v-if="config.importantLinks.length === 0" class="no-news">暂无链接数据，请点击添加链接按钮开始添加</div>
        </div>
      </section>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="save-button" @click="saveConfig">保存配置</button>
      <button class="reset-button" @click="resetConfig">恢复默认</button>
    </div>
    
    <!-- 消息提示 -->
    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>
  </div>
</template>

<script>
import homeConfig from '../config/home.config.js';
import { saveConfigToStorage, loadConfigFromStorage, handleImageUpload } from '../services/configService.js';
import contentManager from '../utils/contentManager.js';

export default {
    name: 'ConfigManager',
    data() {
      return {
        // 导航标签
        tabs: [
          { id: 'home', name: '首页配置' },
          { id: 'latest-news', name: '最新咨询' },
          { id: 'expert-team', name: '专家团队' },
          { id: 'services', name: '技术服务' },
          { id: 'brand-activities', name: '品牌活动' },
          { id: 'intellectual-property', name: '知识产权' },
          { id: 'project-cases', name: '项目案例' },
          { id: 'cooperation-agencies', name: '合作机构' }
        ],
        activeTab: 'home', // 默认显示首页配置
        config: JSON.parse(JSON.stringify(homeConfig)), // 使用默认配置初始化
        message: '',
        messageType: 'success',
        
        // 最新咨询相关数据
        newsItems: [],
        currentNews: null,
        isEditing: false,
        newsImage: '',
        
        // 专家团队相关数据
        currentExpert: null,
        isEditingExpert: false,
        currentExpertIndex: -1, // 保存当前编辑专家的索引，-1表示新增
        
        // 技术服务相关数据
        currentService: null,
        isEditingService: false,
        
        // 品牌活动相关数据
        currentActivity: null,
        isEditingActivity: false,
        
        // 知识产权相关数据
        currentIP: null,
        isEditingIP: false,
        
        // 项目案例相关数据
        currentProject: null,
        isEditingProject: false,
        
        // 合作机构相关数据
        currentAgency: null,
        isEditingAgency: false,
        
        // 重要链接相关数据
        currentLink: null,
        isEditingLink: false
      }
    },
    beforeMount() {
      // 检查是否已登录
      if (!localStorage.getItem('adminLoggedIn')) {
        this.$router.push('/admin-login');
      }
    },
    async mounted() {
      // 尝试从服务端加载配置
      const savedConfig = await loadConfigFromStorage();
      
      // 创建默认配置的深拷贝作为基础
      this.config = JSON.parse(JSON.stringify(homeConfig));
      
      // 如果有保存的配置，将其与默认配置合并
      if (savedConfig) {
        // 合并配置，但保留默认配置中的数据结构
        this.mergeConfigWithDefaults(savedConfig);
      }
      
      // 初始化必要的配置项，确保它们是数组
      this.initializeDefaultConfigValues();
      
      // 处理URL对象转换为字符串
      this.normalizeConfigURLs();
      
      // 加载最新咨询数据
      this.loadNewsItems();
    },
    methods: {
      // 初始化默认配置值，确保所有必要的配置项都存在
      initializeDefaultConfigValues() {
        // 确保英雄区域配置存在
        if (!this.config.hero) {
          this.config.hero = homeConfig.hero || { title: '', subtitle: '' };
        }
        
        // 确保专家团队配置存在且为数组，使用homeConfig作为默认值
        if (!Array.isArray(this.config.expertTeam) || this.config.expertTeam.length === 0) {
          this.config.expertTeam = JSON.parse(JSON.stringify(homeConfig.expertTeam || []));
        }
        
        // 确保技术服务配置存在且为数组，使用homeConfig作为默认值
        if (!Array.isArray(this.config.services) || this.config.services.length === 0) {
          this.config.services = JSON.parse(JSON.stringify(homeConfig.services || []));
        }
        
        // 确保知识产权配置存在且为数组，使用homeConfig作为默认值
        if (!Array.isArray(this.config.intellectualProperty) || this.config.intellectualProperty.length === 0) {
          this.config.intellectualProperty = JSON.parse(JSON.stringify(homeConfig.intellectualProperty || []));
        }
        
        // 确保项目案例配置存在且为数组，使用homeConfig作为默认值
        if (!Array.isArray(this.config.projectCases) || this.config.projectCases.length === 0) {
          this.config.projectCases = JSON.parse(JSON.stringify(homeConfig.projectCases || []));
        }
        
        // 确保合作机构配置存在且为数组，使用homeConfig作为默认值
        if (!Array.isArray(this.config.cooperationAgencies) || this.config.cooperationAgencies.length === 0) {
          this.config.cooperationAgencies = JSON.parse(JSON.stringify(homeConfig.cooperationAgencies || []));
        }
        
        // 确保重要链接配置存在且为数组，使用homeConfig作为默认值
        if (!Array.isArray(this.config.importantLinks) || this.config.importantLinks.length === 0) {
          this.config.importantLinks = JSON.parse(JSON.stringify(homeConfig.importantLinks || []));
        }
        
        // 确保品牌活动配置存在且为数组，使用homeConfig作为默认值
        if (!Array.isArray(this.config.brandActivities) || this.config.brandActivities.length === 0) {
          this.config.brandActivities = JSON.parse(JSON.stringify(homeConfig.brandActivities || []));
        }
        
        // 确保轮播图配置存在且为数组
        if (!Array.isArray(this.config.newsSlider)) {
          this.config.newsSlider = [];
        }
      },
      
      // 合并保存的配置与默认配置
      mergeConfigWithDefaults(savedConfig) {
        // 合并对象，但对于数组类型的配置项，确保它们包含默认数据
        Object.keys(savedConfig).forEach(key => {
          // 对于英雄区域等非数组配置，直接合并
          if (key === 'hero') {
            this.config.hero = { ...this.config.hero, ...savedConfig.hero };
          }
          // 对于数组类型的配置，保留默认配置中的数据
          // 只有当保存的配置中明确有新数据时才覆盖
          else if (Array.isArray(savedConfig[key])) {
            // 如果保存的配置数组为空，保持默认数组不变
            if (savedConfig[key].length > 0) {
              this.config[key] = JSON.parse(JSON.stringify(savedConfig[key]));
            }
            // 否则保持默认配置不变
          }
          // 其他配置项直接合并
          else if (typeof savedConfig[key] === 'object' && savedConfig[key] !== null) {
            this.config[key] = { ...this.config[key], ...savedConfig[key] };
          }
          else {
            this.config[key] = savedConfig[key];
          }
        });
      },
      // 加载最新咨询数据
      loadNewsItems() {
        this.newsItems = contentManager.getNewsContent();
      },
      
      // 开始添加新咨询
      startAddNews() {
        this.currentNews = {
          title: '',
          date: new Date().toISOString().split('T')[0],
          category: '行业动态',
          summary: '',
          content: '',
          image: ''
        };
        this.isEditing = true;
        this.newsImage = '';
      },
      
      // 开始编辑咨询
      startEditNews(news) {
        this.currentNews = { ...news };
        this.isEditing = true;
        this.newsImage = news.image || '';
      },
      
      // 切换标签页方法
      switchTab(tabId) {
        // 确保tabId是字符串类型，避免类型不匹配问题
        this.activeTab = String(tabId);
        console.log('切换到标签页:', this.activeTab);
      },
      
      // 取消编辑
      cancelEdit() {
        this.currentNews = null;
        this.isEditing = false;
        this.newsImage = '';
      },
      
      // 保存咨询（新增或更新）
      saveNews() {
        if (!this.validateNews()) {
          return;
        }
        
        try {
          // 设置图片
          if (this.newsImage) {
            this.currentNews.image = this.newsImage;
          }
          
          if (this.currentNews.id) {
            // 更新现有咨询
            contentManager.updateNews(this.currentNews.id, this.currentNews);
            this.message = '咨询更新成功！';
          } else {
            // 添加新咨询
            contentManager.addNews(this.currentNews);
            this.message = '咨询添加成功！';
          }
          
          this.messageType = 'success';
          this.loadNewsItems(); // 重新加载列表
          this.cancelEdit(); // 退出编辑模式
          
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } catch (error) {
          console.error('保存咨询失败:', error);
          this.message = '保存咨询失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      },
      
      // 删除咨询
      deleteNews(id) {
        if (confirm('确定要删除这条咨询吗？此操作不可恢复。')) {
          try {
            contentManager.deleteNews(id);
            this.message = '咨询删除成功！';
            this.messageType = 'success';
            this.loadNewsItems(); // 重新加载列表
            
            setTimeout(() => {
              this.message = '';
            }, 3000);
          } catch (error) {
            console.error('删除咨询失败:', error);
            this.message = '删除咨询失败，请重试！';
            this.messageType = 'error';
            setTimeout(() => {
              this.message = '';
            }, 3000);
          }
        }
      },
      
      // 处理咨询图片上传
      async handleNewsImageUpload(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
          try {
            // 使用配置服务处理图片上传
            const imageUrl = await handleImageUpload(input.files[0]);
            this.newsImage = imageUrl;
            
            // 显示成功消息
            this.message = '图片上传成功！';
            this.messageType = 'success';
            setTimeout(() => {
              this.message = '';
            }, 3000);
          } catch (error) {
            console.error('上传图片失败:', error);
            this.message = '上传图片失败，请重试！';
            this.messageType = 'error';
            setTimeout(() => {
              this.message = '';
            }, 3000);
          }
        }
      },
      
      // 验证咨询数据
      validateNews() {
        if (!this.currentNews) return false;
        
        if (!this.currentNews.title || this.currentNews.title.trim() === '') {
          this.message = '请输入咨询标题！';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
          return false;
        }
        
        if (!this.currentNews.summary || this.currentNews.summary.trim() === '') {
          this.message = '请输入咨询摘要！';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
          return false;
        }
        
        if (!this.currentNews.content || this.currentNews.content.trim() === '') {
          this.message = '请输入咨询内容！';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
          return false;
        }
        
        return true;
        },
        
        // 登出功能
        logout() {
          localStorage.removeItem('adminLoggedIn');
          this.$router.push('/admin-login');
        },
    
    // 将URL对象转换为字符串
    normalizeConfigURLs() {
      // 处理首页英雄区域的URL
      if (this.config.hero) {
        if (this.config.hero.logo) {
          this.config.hero.logo = typeof this.config.hero.logo === 'string' ? this.config.hero.logo : this.config.hero.logo.href;
        }
        if (this.config.hero.websiteImage) {
          this.config.hero.websiteImage = typeof this.config.hero.websiteImage === 'string' ? this.config.hero.websiteImage : this.config.hero.websiteImage.href;
        }
        if (this.config.hero.wechatQrcode) {
          this.config.hero.wechatQrcode = typeof this.config.hero.wechatQrcode === 'string' ? this.config.hero.wechatQrcode : this.config.hero.wechatQrcode.href;
        }
      }
      
      // 处理轮播图的URL
      if (this.config.newsSlider && Array.isArray(this.config.newsSlider)) {
        this.config.newsSlider.forEach(item => {
          if (item.image) {
            item.image = typeof item.image === 'string' ? item.image : item.image.href;
          }
        });
      }
    },
    
    // 处理单个对象的图片上传
    async handleImageUpload(section, field) {
      const input = event.target;
      if (input.files && input.files[0]) {
        try {
          // 使用配置服务处理图片上传
          const imageUrl = await handleImageUpload(input.files[0]);
          
          // 更新配置
          if (this.config[section]) {
            this.config[section][field] = imageUrl;
          }
          
          // 显示成功消息
          this.message = '图片上传成功！';
          this.messageType = 'success';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } catch (error) {
          console.error('上传图片失败:', error);
          this.message = '上传图片失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      }
    },
    
    // 处理数组中对象的图片上传
    async handleArrayImageUpload(section, index, field) {
      const input = event.target;
      if (input.files && input.files[0]) {
        try {
          // 使用配置服务处理图片上传
          const imageUrl = await handleImageUpload(input.files[0]);
          
          // 更新配置
          if (this.config[section] && this.config[section][index]) {
            this.config[section][index][field] = imageUrl;
          }
          
          // 显示成功消息
          this.message = '图片上传成功！';
          this.messageType = 'success';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } catch (error) {
          console.error('上传图片失败:', error);
          this.message = '上传图片失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      }
    },
    
    // 保存配置
    async saveConfig() {
      try {
        // 创建配置的深拷贝，避免引用问题
        const configCopy = JSON.parse(JSON.stringify(this.config));
        
        // 创建默认配置的深拷贝作为基础
        const defaultConfigCopy = JSON.parse(JSON.stringify(homeConfig));
        
        // 深度合并当前配置与默认配置，但确保保留当前所有修改
        // 重要：对于已经修改过的配置项，即使数组为空也要保留
        const mergedConfig = this.deepMergeConfigWithPreservation(defaultConfigCopy, configCopy);
        
        // 使用配置服务保存合并后的配置到服务端
        const success = await saveConfigToStorage(mergedConfig);
        
        if (success) {
          // 显示成功消息
          this.message = '配置保存成功！';
          this.messageType = 'success';
          
          // 派发自定义事件，通知其他组件配置已更新
          const configUpdatedEvent = new CustomEvent('config-updated', {
            detail: { config: mergedConfig }
          });
          window.dispatchEvent(configUpdatedEvent);
          
          // 不再强制页面刷新，而是直接更新本地配置对象
          // 这样可以保持当前活动标签，避免跳转到首页配置
          this.config = JSON.parse(JSON.stringify(mergedConfig));
          
          // 确保URL格式正确
          this.normalizeConfigURLs();
        } else {
          throw new Error('保存到服务端失败');
        }
        
        // 3秒后隐藏消息
        setTimeout(() => {
          this.message = '';
        }, 3000);
      } catch (error) {
        console.error('保存配置失败:', error);
        this.message = '保存配置失败，请重试！';
        this.messageType = 'error';
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    },
    
    // 深度合并两个配置对象，确保保留所有当前修改
    // 无论数组是否为空，都保留当前配置的值
    deepMergeConfigWithPreservation(defaultConfig, currentConfig) {
      // 创建默认配置的深拷贝作为输出
      const output = JSON.parse(JSON.stringify(defaultConfig));
      
      // 如果当前配置为空，直接返回默认配置
      if (!currentConfig || typeof currentConfig !== 'object') {
        return output;
      }
      
      // 遍历当前配置的所有键
      Object.keys(currentConfig).forEach(key => {
        // 如果键存在于默认配置中，且两者都是对象，则递归合并
        if (key in output && typeof output[key] === 'object' && output[key] !== null &&
            typeof currentConfig[key] === 'object' && currentConfig[key] !== null) {
          // 处理数组类型的特殊情况
          if (Array.isArray(output[key])) {
            // 对于数组，始终使用当前配置的数组内容，无论是否为空
            // 这确保了用户的修改（包括删除所有项）能够被正确保存
            if (Array.isArray(currentConfig[key])) {
              output[key] = JSON.parse(JSON.stringify(currentConfig[key]));
            }
          } else {
            // 对于非数组对象，递归合并
            output[key] = this.deepMergeConfigWithPreservation(output[key], currentConfig[key]);
          }
        } else {
          // 如果键不存在于默认配置中，或者类型不匹配，直接使用当前配置的值
          output[key] = JSON.parse(JSON.stringify(currentConfig[key]));
        }
      });
      
      return output;
    },
    
    // 专家团队相关方法
    startAddExpert() {
      this.currentExpert = { name: '', position: '', description: '', backgroundColor: '#f3f4f6' };
      this.currentExpertIndex = -1; // -1表示新增
      this.isEditingExpert = true;
    },
    
    startEditExpert(index) {
      const expert = this.config.expertTeam[index];
      this.currentExpert = { ...expert };
      this.currentExpertIndex = index; // 保存当前编辑的索引
      this.isEditingExpert = true;
    },
    
    saveExpert() {
      if (!this.currentExpert.name || this.currentExpert.name.trim() === '') {
        this.message = '请输入专家姓名！';
        this.messageType = 'error';
        setTimeout(() => { this.message = ''; }, 3000);
        return;
      }
      
      if (this.currentExpertIndex === -1) {
        // 添加新专家
        this.currentExpert.id = Date.now().toString();
        this.config.expertTeam.push(this.currentExpert);
      } else {
        // 更新现有专家
        this.config.expertTeam[this.currentExpertIndex] = { ...this.currentExpert };
      }
      
      this.saveConfig();
      this.isEditingExpert = false;
      this.currentExpert = null;
      this.currentExpertIndex = -1;
    },
    
    cancelEditExpert() {
      this.isEditingExpert = false;
      this.currentExpert = null;
      this.currentExpertIndex = -1;
    },
    
    confirmDeleteExpert(index) {
      if (confirm('确定要删除这位专家吗？此操作不可恢复。')) {
        this.config.expertTeam.splice(index, 1);
        this.saveConfig();
      }
    },
    
    // 技术服务相关方法
    startAddService() {
      this.currentService = { id: '', name: '', title: '', description: '', icon: '' };
      this.isEditingService = true;
    },
    
    startEditService(index) {
      const service = this.config.services[index];
      // 确保正确映射属性，特别是处理只有title没有name的情况
      this.currentService = {
        id: service.id || '',
        name: service.title || '', // 配置中只有title字段
        title: service.title || '',
        description: service.description || '', // 确保description字段正确加载
        icon: service.icon || ''
      };
      this.isEditingService = true;
    },
    
    saveService() {
      if (!this.currentService.name && !this.currentService.title) {
        this.message = '请输入服务名称！';
        this.messageType = 'error';
        setTimeout(() => { this.message = ''; }, 3000);
        return;
      }
      
      // 强制同步name和title字段，确保两者完全一致
      // 因为表单中用户编辑的是name，但首页显示的是title
      this.currentService.title = this.currentService.name || this.currentService.title;
      this.currentService.name = this.currentService.name || this.currentService.title;
      
      if (!this.currentService.id) {
        // 添加新服务
        this.currentService.id = Date.now().toString();
        this.config.services.push(this.currentService);
      } else {
        // 更新现有服务
        const index = this.config.services.findIndex(s => s.id === this.currentService.id);
        if (index !== -1) {
          this.config.services[index] = { ...this.currentService };
        }
      }
      
      this.saveConfig();
      this.isEditingService = false;
      this.currentService = null;
    },
    
    cancelEditService() {
      this.isEditingService = false;
      this.currentService = null;
    },
    
    confirmDeleteService(index) {
      if (confirm('确定要删除这个服务吗？此操作不可恢复。')) {
        this.config.services.splice(index, 1);
        this.saveConfig();
      }
    },
    
    // 重置服务配置为默认值
    resetToDefaultServices() {
      if (confirm('确定要将服务配置重置为默认值吗？所有自定义修改将丢失！')) {
        try {
          // 使用默认配置中的服务数据
          this.config.services = JSON.parse(JSON.stringify(homeConfig.services));
          this.saveConfig();
          this.message = '服务配置已重置为默认值！';
          this.messageType = 'success';
          setTimeout(() => { this.message = ''; }, 3000);
        } catch (error) {
          console.error('重置配置失败:', error);
          this.message = '重置配置失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => { this.message = ''; }, 3000);
        }
      }
    },
    
    // 自动调整文本框高度
    autoResizeTextarea() {
      this.$nextTick(() => {
        const textarea = this.$refs.serviceDescriptionTextarea;
        if (textarea) {
          // 重置高度
          textarea.style.height = 'auto';
          // 设置新高度，不超过最大高度限制
          const newHeight = Math.min(textarea.scrollHeight, 300);
          textarea.style.height = newHeight + 'px';
        }
      });
    },
    
    // 品牌活动相关方法
    startAddActivity() {
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
      this.currentActivity = { title: '', date: today, description: '', tag: '' };
      this.isEditingActivity = true;
    },
    
    startEditActivity(index) {
      const activity = this.config.brandActivities[index];
      // 保存原始索引，确保更新时能找到正确的活动
      this.currentActivity = { ...activity, _originalIndex: index };
      // 如果活动没有id，为其生成一个临时id，用于标识这是编辑模式而非新增模式
      if (!this.currentActivity.id) {
        this.currentActivity._isEditingWithoutId = true;
      }
      this.isEditingActivity = true;
    },
    
    saveActivity() {
      if (!this.currentActivity.title || this.currentActivity.title.trim() === '') {
        this.message = '请输入活动标题！';
        this.messageType = 'error';
        setTimeout(() => { this.message = ''; }, 3000);
        return;
      }
      
      // 复制当前活动对象并移除临时属性
      const activityToSave = { ...this.currentActivity };
      const originalIndex = activityToSave._originalIndex;
      const isEditingWithoutId = activityToSave._isEditingWithoutId;
      delete activityToSave._originalIndex;
      delete activityToSave._isEditingWithoutId;
      
      // 确定是更新还是添加新活动
      if (originalIndex !== undefined || isEditingWithoutId) {
        // 这是编辑模式 - 使用原始索引更新现有活动
        if (originalIndex !== undefined && originalIndex >= 0) {
          // 为更新的活动分配唯一id
          if (!activityToSave.id) {
            activityToSave.id = Date.now().toString();
          }
          this.config.brandActivities[originalIndex] = activityToSave;
        }
      } else if (!activityToSave.id) {
        // 添加新活动
        activityToSave.id = Date.now().toString();
        this.config.brandActivities.push(activityToSave);
      } else {
        // 有id的现有活动 - 通过id查找更新
        const index = this.config.brandActivities.findIndex(a => a.id === activityToSave.id);
        if (index !== -1) {
          this.config.brandActivities[index] = activityToSave;
        }
      }
      
      this.saveConfig();
      this.isEditingActivity = false;
      this.currentActivity = null;
    },
    
    cancelEditActivity() {
      this.isEditingActivity = false;
      this.currentActivity = null;
    },
    
    confirmDeleteActivity(index) {
      if (confirm('确定要删除这个活动吗？此操作不可恢复。')) {
        this.config.brandActivities.splice(index, 1);
        this.saveConfig();
      }
    },
    
    // 知识产权相关方法
    startAddIP() {
      this.currentIP = { title: '', description: '', backgroundColor: '#f3f4f6' };
      this.isEditingIP = true;
    },
    
    startEditIP(index) {
      const ip = this.config.intellectualProperty[index];
      this.currentIP = { ...ip };
      this.isEditingIP = true;
    },
    
    saveIP() {
      if (!this.currentIP.title || this.currentIP.title.trim() === '') {
        this.message = '请输入知识产权标题！';
        this.messageType = 'error';
        setTimeout(() => { this.message = ''; }, 3000);
        return;
      }
      
      if (!this.currentIP.id) {
        // 添加新知识产权
        this.currentIP.id = Date.now().toString();
        this.config.intellectualProperty.push(this.currentIP);
      } else {
        // 更新现有知识产权
        const index = this.config.intellectualProperty.findIndex(i => i.id === this.currentIP.id);
        if (index !== -1) {
          this.config.intellectualProperty[index] = this.currentIP;
        }
      }
      
      this.saveConfig();
      this.isEditingIP = false;
      this.currentIP = null;
    },
    
    cancelEditIP() {
      this.isEditingIP = false;
      this.currentIP = null;
    },
    
    confirmDeleteIP(index) {
      if (confirm('确定要删除这个知识产权吗？此操作不可恢复。')) {
        this.config.intellectualProperty.splice(index, 1);
        this.saveConfig();
      }
    },
    
    // 项目案例相关方法
    startAddProject() {
      this.currentProject = { title: '', description: '', backgroundColor: '#f3f4f6' };
      this.isEditingProject = true;
    },
    
    startEditProject(index) {
      const project = this.config.projectCases[index];
      this.currentProject = { ...project };
      this.isEditingProject = true;
    },
    
    saveProject() {
      if (!this.currentProject.title || this.currentProject.title.trim() === '') {
        this.message = '请输入项目名称！';
        this.messageType = 'error';
        setTimeout(() => { this.message = ''; }, 3000);
        return;
      }
      
      if (!this.currentProject.id) {
        // 添加新项目
        this.currentProject.id = Date.now().toString();
        this.config.projectCases.push(this.currentProject);
      } else {
        // 更新现有项目
        const index = this.config.projectCases.findIndex(p => p.id === this.currentProject.id);
        if (index !== -1) {
          this.config.projectCases[index] = this.currentProject;
        }
      }
      
      this.saveConfig();
      this.isEditingProject = false;
      this.currentProject = null;
    },
    
    cancelEditProject() {
      this.isEditingProject = false;
      this.currentProject = null;
    },
    
    confirmDeleteProject(index) {
      if (confirm('确定要删除这个项目吗？此操作不可恢复。')) {
        this.config.projectCases.splice(index, 1);
        this.saveConfig();
      }
    },
    
    // 合作机构相关方法
    startAddAgency() {
      this.currentAgency = { id: '', title: '', description: '', backgroundColor: '#f3f4f6' };
      this.isEditingAgency = true;
    },
    
    startEditAgency(index) {
      const agency = this.config.cooperationAgencies[index];
      this.currentAgency = { ...agency };
      this.isEditingAgency = true;
    },
    
    saveAgency() {
      if (!this.currentAgency.title || this.currentAgency.title.trim() === '') {
        this.message = '请输入机构名称！';
        this.messageType = 'error';
        setTimeout(() => { this.message = ''; }, 3000);
        return;
      }
      
      if (!this.currentAgency.id) {
        // 添加新机构
        this.currentAgency.id = Date.now().toString();
        this.config.cooperationAgencies.push(this.currentAgency);
      } else {
        // 更新现有机构
        const index = this.config.cooperationAgencies.findIndex(a => a.id === this.currentAgency.id);
        if (index !== -1) {
          this.config.cooperationAgencies[index] = this.currentAgency;
        }
      }
      
      this.saveConfig();
      this.isEditingAgency = false;
      this.currentAgency = null;
    },
    
    cancelEditAgency() {
      this.isEditingAgency = false;
      this.currentAgency = null;
    },
    
    confirmDeleteAgency(index) {
      if (confirm('确定要删除这个机构吗？此操作不可恢复。')) {
        this.config.cooperationAgencies.splice(index, 1);
        this.saveConfig();
      }
    },
    
    // 重要链接相关方法
    startAddLink() {
      this.currentLink = { name: '', backgroundColor: '#f3f4f6' };
      this.isEditingLink = true;
    },
    
    startEditLink(index) {
      const link = this.config.importantLinks[index];
      this.currentLink = { ...link };
      this.isEditingLink = true;
    },
    
    saveLink() {
      if (!this.currentLink.name || this.currentLink.name.trim() === '') {
        this.message = '请输入链接名称！';
        this.messageType = 'error';
        setTimeout(() => { this.message = ''; }, 3000);
        return;
      }
      
      if (!this.currentLink.id) {
        // 添加新链接
        this.currentLink.id = Date.now().toString();
        this.config.importantLinks.push(this.currentLink);
      } else {
        // 更新现有链接
        const index = this.config.importantLinks.findIndex(l => l.id === this.currentLink.id);
        if (index !== -1) {
          this.config.importantLinks[index] = this.currentLink;
        }
      }
      
      this.saveConfig();
      this.isEditingLink = false;
      this.currentLink = null;
    },
    
    cancelEditLink() {
      this.isEditingLink = false;
      this.currentLink = null;
    },
    
    confirmDeleteLink(index) {
      if (confirm('确定要删除这个链接吗？此操作不可恢复。')) {
        this.config.importantLinks.splice(index, 1);
        this.saveConfig();
      }
    },
    
    // 图片上传处理
    async handleExpertImageUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        try {
          const imageUrl = await handleImageUpload(input.files[0]);
          this.currentExpert.image = imageUrl;
          this.message = '图片上传成功！';
          this.messageType = 'success';
          setTimeout(() => { this.message = ''; }, 3000);
        } catch (error) {
          console.error('上传图片失败:', error);
          this.message = '上传图片失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => { this.message = ''; }, 3000);
        }
      }
    },
    
    async handleServiceImageUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        try {
          const imageUrl = await handleImageUpload(input.files[0]);
          this.currentService.icon = imageUrl;
          this.message = '图片上传成功！';
          this.messageType = 'success';
          setTimeout(() => { this.message = ''; }, 3000);
        } catch (error) {
          console.error('上传图片失败:', error);
          this.message = '上传图片失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => { this.message = ''; }, 3000);
        }
      }
    },
    
    async handleProjectImageUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        try {
          const imageUrl = await handleImageUpload(input.files[0]);
          this.currentProject.image = imageUrl;
          this.message = '图片上传成功！';
          this.messageType = 'success';
          setTimeout(() => { this.message = ''; }, 3000);
        } catch (error) {
          console.error('上传图片失败:', error);
          this.message = '上传图片失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => { this.message = ''; }, 3000);
        }
      }
    },
    
    async handleAgencyImageUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        try {
          const imageUrl = await handleImageUpload(input.files[0]);
          this.currentAgency.logo = imageUrl;
          this.message = '图片上传成功！';
          this.messageType = 'success';
          setTimeout(() => { this.message = ''; }, 3000);
        } catch (error) {
          console.error('上传图片失败:', error);
          this.message = '上传图片失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => { this.message = ''; }, 3000);
        }
      }
    },
    
    // 格式化日期
    formatDate(dateString) {
      if (!dateString) return '';
      try {
        return new Date(dateString).toLocaleDateString('zh-CN');
      } catch {
        return dateString;
      }
    },
    
    // 恢复默认配置
    resetConfig() {
      if (confirm('确定要恢复默认配置吗？当前修改将丢失。')) {
        this.config = JSON.parse(JSON.stringify(homeConfig));
        this.normalizeConfigURLs();
        this.message = '已恢复默认配置！';
        this.messageType = 'info';
        
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.config-manager-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* 头部样式 */
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-actions h1 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
}

/* 导航标签样式 */
.navigation-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background-color: #f1f5f9;
  border-radius: 8px;
  overflow-x: auto;
}

.tab-button {
  padding: 0.75rem 1.25rem;
  background-color: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-button:hover {
  background-color: #f8fafc;
  color: #3b82f6;
  border-color: #3b82f6;
}

.tab-button.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* 配置内容区域 */
.config-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 配置区块样式 */
.config-section {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.config-section h2 {
  color: #1e293b;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #3b82f6;
  font-size: 1.25rem;
  font-weight: 600;
}

/* 内容项样式 */
.content-item {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  transition: all 0.2s ease;
}

.content-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-item h3 {
  color: #374151;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.content-item h3::before {
  content: "📄";
  margin-right: 0.5rem;
}

/* 表单组样式 */
.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input[type="text"],
.form-group textarea,
.form-group input[type="color"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.form-group input[type="text"]:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
}

.form-group input[type="file"] {
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  background-color: #f8fafc;
  cursor: pointer;
  width: 100%;
}

.form-group input[type="color"] {
  height: 40px;
  padding: 0.25rem;
  cursor: pointer;
}

/* 图片预览样式 */
.preview {
  margin-top: 0.75rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  display: inline-block;
}

.preview img {
  max-width: 150px;
  max-height: 150px;
  border-radius: 4px;
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

/* 最新咨询管理样式 */
.news-actions {
  margin-bottom: 1.5rem;
  text-align: right;
}

.add-button {
  background-color: #22c55e;
  color: white;
  padding: 0.75rem 1.5rem;
}

.add-button:hover {
  background-color: #16a34a;
  transform: translateY(-1px);
}

.news-edit-form {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.news-edit-form h3 {
  color: #1e293b;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.form-group.half {
  flex: 1;
  margin-bottom: 0;
}

.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.required {
  color: #ef4444;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-button {
  background-color: #6b7280;
  color: white;
}

.cancel-button:hover {
  background-color: #4b5563;
  transform: translateY(-1px);
}

/* 咨询列表样式 */
.news-list {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.list-header {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: #e2e8f0;
  font-weight: 600;
  font-size: 0.9rem;
  color: #374151;
}

.news-list-item {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.news-list-item:last-child {
  border-bottom: none;
}

.news-list-item:hover {
  background-color: #f8fafc;
}

.news-title-cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.news-title-text {
  font-weight: 500;
  color: #1e293b;
  font-size: 0.95rem;
}

.news-summary-text {
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-date-cell,
.news-category-cell {
  color: #64748b;
  font-size: 0.85rem;
  align-self: center;
}

.news-actions-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
}

.edit-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

.edit-button:hover {
  background-color: #2563eb;
}

.delete-button {
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

.delete-button:hover {
  background-color: #dc2626;
}

.no-news {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #64748b;
}

/* 响应式设计 - 咨询管理 */
@media (max-width: 1024px) {
  .list-header,
  .news-list-item {
    grid-template-columns: 3fr 1fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .list-header {
    display: none;
  }
  
  .news-list-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1rem;
  }
  
  .news-title-text {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  
  .news-date-cell,
  .news-category-cell {
    display: flex;
    gap: 0.5rem;
    align-self: flex-start;
  }
  
  .news-date-cell::before,
  .news-category-cell::before {
    font-weight: 600;
    color: #374151;
  }
  
  .news-date-cell::before {
    content: '日期: ';
  }
  
  .news-category-cell::before {
    content: '分类: ';
  }
  
  .news-actions-cell {
    justify-content: flex-start;
    border-top: 1px solid #e2e8f0;
    padding-top: 0.75rem;
  }
  
  .news-edit-form {
    padding: 1rem;
  }
}

.save-button {
  background-color: #3b82f6;
  color: white;
}

.save-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

/* 服务描述文本框样式 */
.service-description-textarea {
  width: 100%;
  min-height: 80px;
  max-height: 300px;
  resize: none;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  transition: border-color 0.3s;
}

.service-description-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.reset-button {
  background-color: #6b7280;
  color: white;
}

.reset-button:hover {
  background-color: #4b5563;
  transform: translateY(-1px);
}

/* 消息提示样式 */
.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.success {
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.info {
  background-color: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .config-manager-container {
    padding: 0.5rem;
  }
  
  .header-actions {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .navigation-tabs {
    flex-direction: column;
  }
  
  .tab-button {
    width: 100%;
    text-align: center;
  }
  
  .config-section {
    padding: 1rem;
  }
  
  .content-item {
    padding: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .save-button,
  .reset-button {
    max-width: 100%;
  }
  
  .preview img {
    max-width: 100%;
    max-height: 120px;
  }
}
</style>