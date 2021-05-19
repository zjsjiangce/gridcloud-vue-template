## 测试数据字段说明

### nav.json 应用字段说明

| 参数名称 | 参数说明 | 类型 |
| - | - | - |
| code | - | integer(int32) |
| data | - | array |
| appCategoryId | 应用分类Id | 	integer(int64) |
| appKey | 唯一标识 | string |
| appName | 应用名 | string |
| appShow | app是否展示 | boolean |
| checked | 是否选中 | boolean |
| children | - | array |
| hasChildren | - | boolean |
| id | 主键id | integer(int64) |
| parentId | - | integer(int64) |
| createDate | 创建时间 | string(date-time) |
| domainId | 所属业务领域id | string |
| enable | app是否可用 | boolean |
| ico | 应用图标 | string |
| indexUrl | app首页 | string |
| isDeleted | 是否已删除 | integer(int32) |
| jumpType | 应用跳转类型 | string |
| menuType | 菜单类型 | string |
| parentId | 父级id | integer(int64) |
| publicKey | app共钥 | string |
| seq | 排序 | integer(int64) |
| title | 节点显示名称 | string |
| updateDate | 更新时间 | string(date-time) |




### dev.json menu.json 菜单字段说明
| 参数名称 | 参数说明 | 类型 |
| - | - | - |
| code | - | integer(int32) |
| data | - | array |
| apiUrl | api路径 | string |
| appKey | 应用Key | string |
| checked | 是否选中 | boolean |
| children | - | array |
| hasChildren | - | boolean |
| id | 主键id | integer(int64) |
| parentId | 父级id | integer(int64) |
| createDate | 创建时间 | string(date-time) |
| cname | 权限名称 | string |
| ename | 权限英文名 | string |
| description | 权限描述 | string |
| enable | app是否可用 | boolean |
| ico | 权限图标 | string |
| indexId | 排序 | integer(int64) |
| isDeleted | 是否已删除 | integer(int32) |
| jumpType | 打开菜单位置 | string |
| leaderUrl | 上级路径 | string |
| levelType | 权限等级 | integer(int32) |
| menuType | 菜单类型 | string |
| moduleName | 模块名称 | string |
| normalUrl | 权限路径 | string |
| parent | 是否是父级 | boolean |
| permissionType | 权限类型 | integer(int32) |
| urlTarget | 打开菜单位置 | string |
| title | 节点显示名称 | string |
| updateDate | 更新时间 | string(date-time) |

### ⚠️ 注意：
测试数据字段名称均来源于 doraemon 平台，导航及侧边栏组件中数据源字段，也均依靠于此进行开发。

[Doraemon菜单接口文档](https://www.yuque.com/docs/share/2b66df9b-e2f1-49ba-ab44-855d63c1093d?#)
