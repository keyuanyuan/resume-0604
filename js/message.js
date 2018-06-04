! function () {
    var view = document.querySelector('section.messages')
    var conctroller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view,model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.guestName} : ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e)=> {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let guestName = myForm.querySelector('input[name=guestName]').value
            let content = myForm.querySelector('input[name=content]').value
            if(guestName === '' || content === '') {
                alert('请留下您的名字和留言哦！')
            } else {
                this.model.save(guestName, content).then(function (object) {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.guestName} : ${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.appendChild(li)
                    myForm.querySelcector('input[name=content]').value = ''
                    console.log(object)
                })
            }
        }
    }
    var model = {
        //获取数据
        init: function () {
            var APP_ID = '1XK9xBAQSpTQP4SBsvwMw2pH-gzGzoHsz'
            var APP_KEY = 'IfjvcPHijO0njvamzwhlIsdf'
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function () {
            var query = new AV.Query('Message')
            return query.find() //Promise对象
        },
        //创建数据
        save: function (guestName, content) {
            // 修改为保存Message数据到LeanCloud
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ //Promise对象
                'guestName': guestName,
                'content': content,
            })
        }
    }
    
    conctroller.init(view,model)

}.call()