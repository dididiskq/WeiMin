from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import sys

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 配置文件路径 - 支持多环境配置文件路径查找
# 1. 首先尝试从环境变量获取配置文件路径
CONFIG_FILE = os.environ.get('CONFIG_FILE_PATH')

if not CONFIG_FILE:
    # 2. 尝试在dist目录中查找（生产环境）
    dist_config_path = os.path.abspath(os.path.join('..', 'dist', 'config', 'home.config.js'))
    if os.path.exists(dist_config_path):
        CONFIG_FILE = dist_config_path
    else:
        # 3. 尝试当前项目结构中的路径（开发环境）
        dev_config_path = os.path.abspath(os.path.join('..', 'src', 'config', 'home.config.js'))
        if os.path.exists(dev_config_path):
            CONFIG_FILE = dev_config_path
        else:
            # 4. Linux服务器部署路径 - 根据用户提供的目录结构
            linux_config_path = '/home/www/FlaskAndVuePro/dist/config/home.config.js'
            if os.path.exists(linux_config_path):
                CONFIG_FILE = linux_config_path
            else:
                # 5. 最后使用相对路径作为回退
                CONFIG_FILE = os.path.abspath(os.path.join('..', 'src', 'config', 'home.config.js'))

# 记录使用的配置文件路径
print(f"使用配置文件路径: {CONFIG_FILE}")

# 确保配置文件存在
CONFIG_DIR = os.path.dirname(CONFIG_FILE)
if not os.path.exists(CONFIG_DIR):
    try:
        os.makedirs(CONFIG_DIR, exist_ok=True)
        print(f"创建配置文件目录: {CONFIG_DIR}")
        
        # 创建默认配置文件
        with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
            default_config = {
                "hero": {
                    "title": "深圳市为民可靠性系统工程研究院",
                    "subtitle": "专注于可靠性工程领域的研究与应用",
                    "background": "url('./assets/bg.jpg')"
                },
                "newsSlider": [],
                "expertTeam": [],
                "services": []
            }
            f.write(f"export default {json.dumps(default_config, ensure_ascii=False, indent=2)}")
        print(f"创建默认配置文件: {CONFIG_FILE}")
    except Exception as e:
        print(f"创建配置文件失败: {str(e)}")
        # 继续运行，但记录警告
        print("警告: 配置文件创建失败，可能无法正常保存配置更改")
elif not os.path.exists(CONFIG_FILE):
    try:
        # 如果目录存在但文件不存在，创建默认配置文件
        with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
            default_config = {
                "hero": {
                    "title": "深圳市为民可靠性系统工程研究院",
                    "subtitle": "专注于可靠性工程领域的研究与应用",
                    "background": "url('./assets/bg.jpg')"
                },
                "newsSlider": [],
                "expertTeam": [],
                "services": []
            }
            f.write(f"export default {json.dumps(default_config, ensure_ascii=False, indent=2)}")
        print(f"创建默认配置文件: {CONFIG_FILE}")
    except Exception as e:
        print(f"创建配置文件失败: {str(e)}")

@app.route('/api/config', methods=['GET'])
def get_config():
    """获取配置信息 - 从JavaScript模块中提取配置数据"""
    try:
        with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 解析JavaScript模块，提取export default后面的配置对象
        # 查找export default 行
        start_index = content.find('export default {')
        if start_index == -1:
            return jsonify({}), 500
            
        # 跳过 'export default ' 文本
        start_index += len('export default ')
        
        # 计算括号匹配，找到JSON对象的结束位置
        brace_count = 0
        end_index = start_index
        for i in range(start_index, len(content)):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_index = i + 1
                    break
        
        # 提取配置对象内容
        config_content = content[start_index:end_index]
        
        # 首先尝试直接用json.loads解析，如果成功则直接返回
        try:
            config = json.loads(config_content)
            return jsonify(config)
        except json.JSONDecodeError:
            # 如果直接解析失败，说明包含JavaScript表达式，使用正则提取
            import re
            config = {}
            
            # 提取hero配置
            hero_match = re.search(r'hero:\s*{([^{}]*|{[^{}]*})*}', config_content, re.DOTALL)
            if hero_match:
                hero_content = hero_match.group(0)
                # 提取title和subtitle等简单字符串值
                title_match = re.search(r'title:\s*[\'"](.*?)[\'"]', hero_content)
                subtitle_match = re.search(r'subtitle:\s*[\'"](.*?)[\'"]', hero_content)
                config['hero'] = {}
                if title_match:
                    config['hero']['title'] = title_match.group(1)
                if subtitle_match:
                    config['hero']['subtitle'] = subtitle_match.group(1)
                # 对于URL等JavaScript表达式，提供占位符值
                config['hero']['video'] = '/videos/background.mp4'
                config['hero']['logo'] = '/logo.svg'
                config['hero']['websiteImage'] = '/changm.png'
                config['hero']['wechatQrcode'] = '/gzh.png'
            
            # 提取newsSlider配置
            news_match = re.search(r'newsSlider:\s*\[(.*?)\]', config_content, re.DOTALL)
            if news_match:
                news_content = news_match.group(1)
                news_items = []
                # 匹配每个news item
                item_matches = re.finditer(r'\{[^}]*\}', news_content)
                for match in item_matches:
                    item_str = match.group(0)
                    caption_match = re.search(r'caption:\s*[\'"](.*?)[\'"]', item_str)
                    if caption_match:
                        news_items.append({
                            'image': '/placeholder.png',  # 占位符图片
                            'caption': caption_match.group(1)
                        })
                config['newsSlider'] = news_items
            
            # 提取expertTeam配置
            expert_match = re.search(r'expertTeam:\s*\[(.*?)\]', config_content, re.DOTALL)
            if expert_match:
                expert_content = expert_match.group(1)
                experts = []
                # 匹配每个expert
                expert_matches = re.finditer(r'\{[^}]*\}', expert_content)
                for match in expert_matches:
                    expert_str = match.group(0)
                    name_match = re.search(r'name:\s*[\'"](.*?)[\'"]', expert_str)
                    position_match = re.search(r'position:\s*[\'"](.*?)[\'"]', expert_str)
                    desc_match = re.search(r'description:\s*[\'"](.*?)[\'"]', expert_str)
                    bg_match = re.search(r'backgroundColor:\s*[\'"](.*?)[\'"]', expert_str)
                    if name_match:
                        expert = {'name': name_match.group(1)}
                        if position_match:
                            expert['position'] = position_match.group(1)
                        if desc_match:
                            expert['description'] = desc_match.group(1)
                        if bg_match:
                            expert['backgroundColor'] = bg_match.group(1)
                        experts.append(expert)
                config['expertTeam'] = experts
            
            # 提取services配置
            service_match = re.search(r'services:\s*\[(.*?)\]', config_content, re.DOTALL)
            if service_match:
                service_content = service_match.group(1)
                services = []
                # 匹配每个service
                service_matches = re.finditer(r'\{[^}]*\}', service_content)
                for match in service_matches:
                    service_str = match.group(0)
                    id_match = re.search(r'id:\s*[\'"](.*?)[\'"]', service_str)
                    title_match = re.search(r'title:\s*[\'"](.*?)[\'"]', service_str)
                    desc_match = re.search(r'description:\s*[\'"](.*?)[\'"]', service_str)
                    if title_match:
                        service = {'title': title_match.group(1)}
                        if id_match:
                            service['id'] = id_match.group(1)
                        if desc_match:
                            service['description'] = desc_match.group(1)
                        services.append(service)
                config['services'] = services
            
            # 提取intellectualProperty配置
            ip_match = re.search(r'intellectualProperty:\s*\[(.*?)\]', config_content, re.DOTALL)
            if ip_match:
                ip_content = ip_match.group(1)
                ip_items = []
                # 匹配每个ip item
                ip_matches = re.finditer(r'\{[^}]*\}', ip_content)
                for match in ip_matches:
                    ip_str = match.group(0)
                    title_match = re.search(r'title:\s*[\'"](.*?)[\'"]', ip_str)
                    desc_match = re.search(r'description:\s*[\'"](.*?)[\'"]', ip_str)
                    bg_match = re.search(r'backgroundColor:\s*[\'"](.*?)[\'"]', ip_str)
                    if title_match:
                        ip_item = {'title': title_match.group(1)}
                        if desc_match:
                            ip_item['description'] = desc_match.group(1)
                        if bg_match:
                            ip_item['backgroundColor'] = bg_match.group(1)
                        ip_items.append(ip_item)
                config['intellectualProperty'] = ip_items
            
            # 返回提取的配置
            return jsonify(config)
    except Exception as e:
        app.logger.error(f"加载配置失败: {str(e)}")
        return jsonify({}), 500

@app.route('/api/config', methods=['POST'])
def save_config():
    """保存配置信息 - 写入JavaScript模块格式，保留原始文件结构"""
    try:
        # 尝试获取JSON数据，并捕获可能的JSON解析错误
        try:
            config = request.json
            if config is None:
                # 检查请求体是否为空
                if not request.data:
                    return jsonify({"error": "请求体为空，没有提供配置数据"}), 400
                # 检查Content-Type
                if 'application/json' not in request.content_type:
                    return jsonify({"error": f"不支持的Content-Type: {request.content_type}"}), 400
                # JSON解析失败
                return jsonify({"error": "无效的JSON格式数据"}), 400
        except Exception as json_error:
            return jsonify({"error": f"JSON解析错误: {str(json_error)}"}), 400
        
        # 验证配置数据
        if not isinstance(config, dict):
            return jsonify({"error": "配置数据必须是对象类型"}), 400
        
        # 记录配置数据的基本信息（不记录完整配置以避免日志过大）
        app.logger.info(f"收到配置保存请求，配置项数量: {len(config.keys())}")
        
        # 保留原始文件的注释和模块结构，但更新配置内容
        # 先读取原始文件内容
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # 查找export default行之前的注释
            export_pos = original_content.find('export default')
            if export_pos > 0:
                # 保留注释部分
                comments = original_content[:export_pos]
            else:
                # 如果没有找到export default，使用默认注释
                comments = "// 首页配置文件\n// 非技术人员可以修改此文件来更新首页内容\n\n"
        except:
            # 如果文件不存在或无法读取，使用默认注释
            comments = "// 首页配置文件\n// 非技术人员可以修改此文件来更新首页内容\n\n"
        
        # 生成新的JavaScript模块内容，保留URL等JavaScript表达式的占位符
        # 创建一个包含占位符的配置对象
        config_with_placeholders = config.copy()
        
        # 为hero部分添加占位符
        if 'hero' in config_with_placeholders:
            hero = config_with_placeholders['hero']
            # 保留title和subtitle，为其他字段添加占位符
            if 'video' not in hero:
                hero['video'] = '/videos/background.mp4'
            if 'logo' not in hero:
                hero['logo'] = "new URL('@/assets/logo.svg', import.meta.url).href"
            if 'websiteImage' not in hero:
                hero['websiteImage'] = "new URL('@/assets/changm.png', import.meta.url).href"
            if 'wechatQrcode' not in hero:
                hero['wechatQrcode'] = "new URL('@/assets/gzh.png', import.meta.url).href"
        
        # 为newsSlider部分添加占位符
        if 'newsSlider' in config_with_placeholders:
            for item in config_with_placeholders['newsSlider']:
                if 'image' not in item:
                    item['image'] = "new URL('@/assets/placeholder.png', import.meta.url).href"
        
        # 生成JavaScript格式的配置内容（注意这不是严格的JSON）
        js_config_str = "{\n"
        
        # 添加hero配置
        if 'hero' in config_with_placeholders:
            js_config_str += "  // 英雄区域配置\n"
            js_config_str += "  hero: {\n"
            hero = config_with_placeholders['hero']
            if 'title' in hero:
                js_config_str += f"    title: '{hero['title']}',\n"
            if 'subtitle' in hero:
                js_config_str += f"    subtitle: '{hero['subtitle']}',\n"
            js_config_str += "    video: '/videos/background.mp4',\n"
            js_config_str += "    logo: new URL('@/assets/logo.svg', import.meta.url).href,\n"
            js_config_str += "    websiteImage: new URL('@/assets/changm.png', import.meta.url).href,\n"
            js_config_str += "    wechatQrcode: new URL('@/assets/gzh.png', import.meta.url).href,\n"
            js_config_str += "  },\n\n"
        
        # 添加newsSlider配置
        if 'newsSlider' in config_with_placeholders:
            js_config_str += "  // 最新资讯轮播图配置\n"
            js_config_str += "  newsSlider: [\n"
            for i, item in enumerate(config_with_placeholders['newsSlider']):
                js_config_str += "    {\n"
                js_config_str += "      image: new URL('@/assets/placeholder.png', import.meta.url).href,\n"
                if 'caption' in item:
                    js_config_str += f"      caption: '{item['caption']}'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['newsSlider']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ],\n\n"
        
        # 添加其他配置项（如果存在）
        # expertTeam
        if 'expertTeam' in config_with_placeholders:
            js_config_str += "  // 专家团队配置\n"
            js_config_str += "  expertTeam: [\n"
            for i, expert in enumerate(config_with_placeholders['expertTeam']):
                js_config_str += "    {\n"
                if 'name' in expert:
                    js_config_str += f"      name: '{expert['name']}',\n"
                if 'position' in expert:
                    js_config_str += f"      position: '{expert['position']}',\n"
                if 'description' in expert:
                    js_config_str += f"      description: '{expert['description']}',\n"
                if 'backgroundColor' in expert:
                    js_config_str += f"      backgroundColor: '{expert['backgroundColor']}'\n"
                else:
                    js_config_str += "      backgroundColor: '#dcfce7'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['expertTeam']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ],\n\n"
        
        # services
        if 'services' in config_with_placeholders:
            js_config_str += "  // 技术服务配置\n"
            js_config_str += "  services: [\n"
            for i, service in enumerate(config_with_placeholders['services']):
                js_config_str += "    {\n"
                if 'id' in service:
                    js_config_str += f"      id: '{service['id']}',\n"
                if 'title' in service:
                    js_config_str += f"      title: '{service['title']}',\n"
                if 'description' in service:
                    js_config_str += f"      description: '{service['description']}'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['services']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ],\n\n"
        
        # 添加知识产权和智库配置
        if 'intellectualProperty' in config_with_placeholders:
            js_config_str += "  // 知识产权和智库配置\n"
            js_config_str += "  intellectualProperty: [\n"
            for i, ip in enumerate(config_with_placeholders['intellectualProperty']):
                js_config_str += "    {\n"
                if 'title' in ip:
                    js_config_str += f"      title: '{ip['title']}',\n"
                if 'description' in ip:
                    js_config_str += f"      description: '{ip['description']}',\n"
                if 'backgroundColor' in ip:
                    js_config_str += f"      backgroundColor: '{ip['backgroundColor']}'\n"
                else:
                    js_config_str += "      backgroundColor: '#dbeafe'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['intellectualProperty']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ],\n\n"
        
        # 添加品牌活动配置
        if 'brandActivities' in config_with_placeholders:
            js_config_str += "  // 品牌活动配置\n"
            js_config_str += "  brandActivities: [\n"
            for i, activity in enumerate(config_with_placeholders['brandActivities']):
                js_config_str += "    {\n"
                if 'date' in activity:
                    js_config_str += f"      date: '{activity['date']}',\n"
                if 'title' in activity:
                    js_config_str += f"      title: '{activity['title']}',\n"
                if 'description' in activity:
                    js_config_str += f"      description: '{activity['description']}',\n"
                if 'tag' in activity:
                    js_config_str += f"      tag: '{activity['tag']}'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['brandActivities']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ],\n\n"
        
        # 添加项目案例配置
        if 'projectCases' in config_with_placeholders:
            js_config_str += "  // 项目案例配置\n"
            js_config_str += "  projectCases: [\n"
            for i, project in enumerate(config_with_placeholders['projectCases']):
                js_config_str += "    {\n"
                if 'title' in project:
                    js_config_str += f"      title: '{project['title']}',\n"
                if 'description' in project:
                    js_config_str += f"      description: '{project['description']}',\n"
                if 'backgroundColor' in project:
                    js_config_str += f"      backgroundColor: '{project['backgroundColor']}'\n"
                else:
                    js_config_str += "      backgroundColor: '#dbeafe'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['projectCases']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ],\n\n"
        
        # 添加合作机构配置
        if 'cooperationAgencies' in config_with_placeholders:
            js_config_str += "  // 合作机构配置\n"
            js_config_str += "  cooperationAgencies: [\n"
            for i, agency in enumerate(config_with_placeholders['cooperationAgencies']):
                js_config_str += "    {\n"
                if 'id' in agency:
                    js_config_str += f"      id: '{agency['id']}',\n"
                if 'title' in agency:
                    js_config_str += f"      title: '{agency['title']}',\n"
                if 'description' in agency:
                    js_config_str += f"      description: '{agency['description']}',\n"
                if 'backgroundColor' in agency:
                    js_config_str += f"      backgroundColor: '{agency['backgroundColor']}'\n"
                else:
                    js_config_str += "      backgroundColor: '#3b82f6'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['cooperationAgencies']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ],\n\n"
        
        # 添加重要链接配置
        if 'importantLinks' in config_with_placeholders:
            js_config_str += "  // 重要链接配置\n"
            js_config_str += "  importantLinks: [\n"
            for i, link in enumerate(config_with_placeholders['importantLinks']):
                js_config_str += "    {\n"
                if 'name' in link:
                    js_config_str += f"      name: '{link['name']}',\n"
                if 'backgroundColor' in link:
                    js_config_str += f"      backgroundColor: '{link['backgroundColor']}'\n"
                else:
                    js_config_str += "      backgroundColor: '#dbeafe'\n"
                js_config_str += "    }"
                if i < len(config_with_placeholders['importantLinks']) - 1:
                    js_config_str += ","
                js_config_str += "\n"
            js_config_str += "  ]\n"
        
        # 关闭配置对象
        js_config_str += "}"
        
        # 组合最终的JavaScript模块内容
        js_content = comments + "export default " + js_config_str + "\n"
        
        # 保存配置到文件
        with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        return jsonify({"success": True, "message": "配置保存成功"})
    except Exception as e:
        app.logger.error(f"保存配置失败: {str(e)}")
        return jsonify({"error": f"服务器内部错误: {str(e)}"}), 500

@app.route('/api/config', methods=['DELETE'])
def clear_config():
    """清除配置信息"""
    try:
        with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
            json.dump({}, f, ensure_ascii=False)
        return jsonify({"success": True, "message": "配置已清除"})
    except Exception as e:
        app.logger.error(f"清除配置失败: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查接口"""
    return jsonify({"status": "healthy", "service": "config-api"})

if __name__ == '__main__':
    # 确保后端目录存在
    if not os.path.exists(os.path.dirname(os.path.abspath(CONFIG_FILE))):
        os.makedirs(os.path.dirname(os.path.abspath(CONFIG_FILE)))
    
    # 在生产环境中应该使用更安全的配置
    app.run(host='0.0.0.0', port=5000, debug=False)