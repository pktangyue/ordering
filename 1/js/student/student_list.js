$(function(){
    var Student = (function(){;
        var $J_new      = $('#J_new');
        var $J_new_row  = $('#J_new_row');

        var Student = {
            initialize : function(){
                new Student.ListView();
                new Student.AddView();
                return this;
            }
        };
        Student.Model = Backbone.Model.extend({
            initialize : function(){
            },
            defaults : {
                number      : '',
                name        : '',
                gender      : '',
                school      : '',
                major       : '',
                birthday    : '',
                province_id : '',
                city_id     : '',
                profile     : ''
            },
            validate: function(attrs) {
                var error_msg = '';
                if( attrs.number && ! this.is_positive(attrs.number) ){
                    error_msg += 'need positive integer!\n';
                }
                if( !Util.Student.check_number() ){
                    error_msg += 'dupplicate number!\n';
                }
                $.each(attrs,function(i,v){
                    if( !attrs[i] ){
                        error_msg += 'no ' + i.replace('_id','') + '!\n';
                    }
                });
                return error_msg;
            },
            is_positive : function(v){
                return /^\d+$/.test(v);
            }
        });
        Student.Collection = Backbone.Collection.extend({
            initialize : function(){
            },
            model : Student.Model,
            url : '/student/get_items'
        });
        var students = new Student.Collection();
        Student.ListView = Backbone.View.extend({
            el : 'tbody',
            initialize : function(){
                students.bind('reset',this.addAll,this);
                students.bind('add',this.addOne,this);
                students.fetch();
            },
            addAll : function(){
                students.each($.proxy(this.addOne,this));
            },
            addOne : function(student){
                var view = new Student.ItemView({model : student});
                this.$el.append(view.render().$el);
            }
        });
        Student.ItemView = Backbone.View.extend({
            tagName : 'tr',
            initialize : function(){
                this.model.bind('change',this.render,this);
            },
            template : [
                '<td>{{number}}</td>',
                '<td>{{name}}</td>',
                '<td>{{gender_display}}</td>',
                '<td>{{school}}</td>',
                '<td>{{major}}</td>',
                '<td>{{birthday}}</td>',
                '<td>{{province}}&nbsp;{{city}}</td>',
                '<td>{{profile}}</td>',
                '<td><a href="javascript:void(0);" class="edit">[edit]</a>&nbsp;<a href="javascript:void(0);" class="delete">[delete]</a></td>'
            ].join(''),
            render : function(){
                this.$el.html(Mustache.to_html(this.template,this.model.attributes));
                return this;
            }
        });
        Student.AddView = Backbone.View.extend({
            el          : 'tfoot',
            initialize  : function(){
                this.$('#J_birthday').datepicker();
                this.get_new_model();
            },
            events      : {
                'click #J_new'        : 'new_clicked',
                'click #J_add'        : 'add_clicked',
                'click #J_cancel'     : 'cancel_clicked'
            },
            update_values : function(event){
                var fields = this.$('input,select').serializeArray();
                var attrs = {};
                $.each(fields,function(i,v){
                    attrs[v.name] = $.trim(v.value);
                });
                return attrs;
            },
            get_new_model : function(){
                this.model = new Student.Model();
                this.model.url = '/student/add';
            },
            reset_new_row : function(){
                $J_new_row.hide()
                .find('input[type=text],select').val('').end()
                .find('input[type=radio]').prop('checked',false);
            },
            new_clicked : function(event){
                $J_new_row.show();
            },
            add_clicked : function(event){
                this.model.save( this.update_values(), {
                    success : $.proxy(function(model,result){
                        this.reset_new_row();
                        students.add(model);
                        this.get_new_model();
                    },this),
                    error : function(model,result){
                        alert(result);
                    }
                });
            },
            cancel_clicked : function(event){
                this.reset_new_row();
                Util.Student.hide_error();
            }
        });
        return Student.initialize();
    })();
});
