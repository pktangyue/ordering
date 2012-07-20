$(function(){
    var Region = (function(){
        var $J_province = $('#J_province');
        var $J_city     = $('#J_city');

        var Region = {
            initialize : function(){
                new Region.View;
                return this;
            }
        }
        Region.Model = Backbone.Model.extend({
            initialize : function(){
            },
            idAttribute : 'id',
            urlRoot: '/student/get_cities'
        });
        Region.View = Backbone.View.extend({
            el : '#J_region',
            initialize : function(){
                this.model.on('change',this.render,this);
            },
            model : new Region.Model,
            template : '<option value="">----</option>{{#cities}}<option value="{{id}}">{{name}}</option>{{/cities}}',
            render : function(){
                $J_city.html(Mustache.to_html(this.template,this.model.attributes));
                return this;
            },
            events : {
                'change #J_province' : 'province_changed'
            },
            province_changed : function(event){
                this.model.set({ id : $J_province.val()},{silent : true}).fetch();
            }
        });
        return Region.initialize();
    })();
});
