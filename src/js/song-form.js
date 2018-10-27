{
    let view = {
        el: '.page > main',
        init(){
            this.$el = $(this.el)
        },
        template: `
        <form action="" class="form">
        <div class="row">
          <label for="">
            歌名
          </label>
          <input type="text" name="name" value="__name__" id="">
        </div>
        <div class="row">
          <label for="">
            歌手
          </label>
          <input type="text" name="singer" value="__singer__"id="">
        </div>
        <div class="row">
          <label for="">
            外链
          </label>
          <input type="text" name="url" value="__url__" id="">
        </div>
        <div class="row">
        <label for="">
          封面
        </label>
        <input type="text" name="cover" value="__cover__" id="">
      </div>
        <div class="row actions">
          <button type="submit">保存</button>
        </div>
      </form>
        `,
        render(data ={}){
            let placeholders = ['name', 'url', 'singer', 'id', 'cover']            
            let html = this.template
            placeholders.map((string)=>{
                html = html.replace(`__${string}__`, data[string] || '') //不写或就会是undefined
            })
            $(this.el).html(html)
        },
        reset(){
            this.render({})
        }
    }
    let model = {
        data: {
            name: '', singer: '', url: '', id: '', cover: ''
          },
        create(data){
              // 声明类型
                var Song = AV.Object.extend('Song');
                var song = new Song();
                song.set('name', data.name);
                song.set('singer', data.singer);
                song.set('url', data.url);
                song.set('cover', data.cover);
                // 保存到云端
                return song.save()
                  .then((newSong) => {
                    let {id, attributes} = newSong
                    // Object.assign(this.data, {
                    //   id: id,
                    //   name: attributes.name,
                    //   singer: attributes.singer,
                    //   url: attributes.url
                    // })
                    Object.assign(this.data, {
                        id,
                        ...attributes
                      })
                }, (error)=>{
                    console.error(error);  
                });
        }
    }
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload', (data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('select', (data)=>{
                
                this.model.data = data
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            this.view.$el.on('submit', 'form', (e)=>{
                e.preventDefault()
                let needs = 'name singer url cover'.split(' ')
                let data = {}
                needs.map((string)=>{
                    data[string] = this.view.$el.find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                .then(()=>{
                    this.view.reset()
                    let string = JSON.stringify(this.model.data)
                    let object = JSON.parse(string)
                    window.eventHub.emit('create', object)
                })
            })
        }
    }
    controller.init(view, model)

}

