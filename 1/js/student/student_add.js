$(function(){
    var StudentAdd = (function(){;
        var $J_new      = $('#J_new');
        var $J_new_row  = $('#J_new_row');

        var Add = {
            initialize : function(){
                new Add.View();
                return this;
            }
        };
        Add.Model = Backbone.Model.extend({
            initialize : function(){
            },
            url : '/student/add',
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
                if( !Student.Util.check_number() ){
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
        Add.View = Backbone.View.extend({
            el          : 'tfoot',
            model       : new Add.Model,
            initialize  : function(){
                this.$('#J_birthday').datepicker();
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
            new_clicked : function(event){
                $J_new_row.show();
            },
            add_clicked : function(event){
                this.model.save( this.update_values(), {
                    success : function(model,result){
                        document.location.reload();
                    },
                    error : function(model,result){
                        alert(result);
                    }
                });
            },
            cancel_clicked : function(event){
                $J_new_row.hide()
                .find('input[type=text],select').val('').end()
                .find('input[type=radio]').prop('checked',false);
                Student.Util.hide_error();
            }
        });
        return Add.initialize();
    })();
});
