$(function(){
    var StudentNumber = (function(){
        var $error = $('.error');

        var StudentNumber = {
            initialize : function(){
                new StudentNumber.View();
                return this;
            },
            isValid : true,
            show_error : function(){
                $error.show();
                this.isValid = false;
            },
            hide_error : function(){
                $error.hide();
                this.isValid = true;
            }
        };
        StudentNumber.Model = Backbone.Model.extend({
            initialize : function(){
            },
            urlRoot : '/student/check_number'
        });
        StudentNumber.View = Backbone.View.extend({
            el : '#J_number',
            initialize : function(){
            },
            model : new StudentNumber.Model,
            events : {
                'keyup' : 'number_keyuped'
            },
            number_keyuped : function(event){
                this.model.set({id : this.$el.val()}).fetch({
                    success : function(model,result){
                        if(result){
                            StudentNumber.show_error();
                        }else{
                            StudentNumber.hide_error();
                        }
                    },
                    error : function(model,result){
                        alert('error');
                    }
                });
            }
        });
        return StudentNumber.initialize();
    })();

    window.Student = window.Student || { Util : {} };
    window.Student.Util.check_number = function(){
        return StudentNumber.isValid;
    };
    window.Student.Util.hide_error = function(){
        StudentNumber.hide_error();
    }
});
