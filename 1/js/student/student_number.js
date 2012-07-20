$(function(){
    var StudentNumber = (function(){
        var $error = $('.error');

        var StudentNumber = {
            initialize : function(){
                new StudentNumber.View();
                return this;
            },
            isValid : true
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
                            $error.show();
                            StudentNumber.isValid = false;
                        }else{
                            $error.hide();
                            StudentNumber.isValid = true;
                        }
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
});
