var urls ={};
var URLBuilder = {
        
    userInput : {
        baseUrl : "",
        subSource : ""
    },
    
    init : function() {
        this.userInput.baseUrl = $('#base-url').val();
        this.userInput.subSource = $('#subsource').val();
        this.userInput.testingMode = $('#testing').is(':checked');
        this.generateUrls();
        this.renderUrls();
    },

    generateUrls : function() {
        // generate urls from input
        var baseUrl = this.userInput.baseUrl,
            subSource = this.userInput.subSource,
            utmSource = "gpeace",
            testing = this.userInput.testingMode,
            sources = {
                social: "cl",
                taf: "taf"
            };
        if (testing) {
            console.log('in testing');
            for(var source in sources) {
                var testSource = "zzz" + sources[source];
                sources[source] = testSource;
            }
        }
        urls = {
            "email" : "?source="+sources.social+"&subsource="+subSource+"&utm_medium="+sources.social+"&utm_source="+utmSource+"&utm_campaign="+subSource,
            "facebook" : "?source="+sources.social+"&subsource="+subSource+"&utm_medium="+sources.social+"&utm_source="+utmSource+"&utm_campaign="+subSource,
            "twitter" : "?source="+sources.social+"&subsource="+subSource+"&utm_medium="+sources.social+"&utm_source="+utmSource+"&utm_campaign="+subSource,
            "postaction-bounceback" : "?source="+sources.taf+"&subsource="+subSource+"&utm_medium="+sources.social+"&utm_source="+utmSource+"&utm_campaign="+subSource,
            "facebook-taf" : "?source="+sources.taf+"&subsource="+subSource+"&utm_medium="+sources.social+"&utm_source="+utmSource+"&utm_campaign="+subSource,
            "twitter-taf" : "?source="+sources.taf+"&subsource="+subSource+"&utm_medium="+sources.social+"&utm_source="+utmSource+"&utm_campaign="+subSource,
        };
        
        $.each(urls, function(key, value){
            // prepend base url
            var thisUrl = baseUrl + value;
            urls[key] = thisUrl;
        });
    },
    
    renderUrls : function() {
        // add urls to table
        $('.link-output').each(function(){
            var thisKey = $(this).attr('data-key');
            console.log(thisKey);
            var thisUrl = urls[thisKey];
            if (thisUrl) {
                $(this).find('a').html(thisUrl);
            }
        });
    }
}

$(function() {
    
    // Initialise 'copy' buttons
    new Clipboard('table .btn');
    
    $('#start-btn').on('click', function(){
        URLBuilder.init();
    });
  
});

