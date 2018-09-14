# TodoList

## 功能截图

### 添加一个待办事项

在输入框填写待办事项内容后，选择到期时间（一小时后、两小时后等），点击新建，将会把内容发到服务端，同时添加一个TaskItem到TaskList中。

![add](C:\Users\shaop\Desktop\TodoList\image\add.gif)

### 删除一个待办事项

点击事项旁的删除按钮，将删除此事项。

![delete](C:\Users\shaop\Desktop\TodoList\image\delete.gif)

### 编辑一个事项内容

点击事项的内容就会进入编辑模式，编辑完成后点击确定，就会将内容上传，同时更新TaskItem

![edit](C:\Users\shaop\Desktop\TodoList\image\edit.gif)

### 完成事项

点击事项旁边的checkbox使事项变为完成状态，当事项超时，会变为任务超时。

![complete](C:\Users\shaop\Desktop\TodoList\image\complete.gif)





## 后端提供的api

1. 新建事项：POST /tasks，同时传入事项的内容和过期时间和是否完成。
2. 删除事项：DELETE /tasks ，同时传入事项的id来指定要删除的事项。
3. 编辑事项和完成事项：PUT /tasks，同时传入事项id和要更新的内容。

## 在线Demo

[http://todo.dowob.cn](http://todo.dowob.cn)

在本地开发时，用的是默认的sqllite，在服务器上使用的是PostgreSQL