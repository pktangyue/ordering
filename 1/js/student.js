$(function(){
    var NewStudentModel = Backbone.Model.extend({
        initialize : function(){
        },
        validate: function(attrs) {
            var error_msg = '';
            $.each(attrs,function(i,v){
                if( !attrs[i] ){
                    error_msg += 'no ' + i + '!\n';
                }
            });
            return error_msg;
        }
    });
    var NewStudentView = Backbone.View.extend({
        el          : 'tfoot',
        model       : new NewStudentModel,
        initialize  : function(){
            $('#J_new').click(function(){
                $('#J_new_row').show();
            });
            this.value_changed();
        },
        events      : {
            'change input' : 'value_changed',
            'click #J_add' : 'add_clicked'
        },
        value_changed : function(event){
            var fields = this.$('input').serializeArray(),
            result = {};
            $.each(fields,function(i,v){
                result[v.name] = $.trim(v.value);
            });
            this.result = result;
        },
        add_clicked : function(event){
            if(!this.model.set( this.result, {
                error: function(model, error) {
                    alert(error);
                }
            })) {
                return;
            }
            //this.model.save();
        }
    });
    var newStduentView = new NewStudentView();
});
