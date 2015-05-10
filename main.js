if(!localStorage.getItem("listItems")){
    //init
    localStorage.setItem("listItems",[]);
}
$(document).ready(function(){
    console.log('w00t w00t');
    function addItem(itemName,checked,fromLocal){
	//both checked and fromLocal default to false, and undefined is falsy!
	checked   = !!checked
	fromLocal = !!fromLocal
	c = $("#template-row").clone();
	c.attr("id","");
	c.css("visibility","visible");
	if(!itemName) itemName = $("#add-input").val();
	c.find(".item-desc").text(itemName);
	b = c.find(".bigcheck");
	b.on('mousedown',function(e){
	    if( typeof b.data("checked") === 'undefined' )
		b.data("checked",false);
	    if(!b.data("checked")){
		b.children("img").attr("src","inset.png");
	    }
	}).on('mouseup',function(e){
	    if(b.data("checked")){
		b.children("img").attr("src","unchecked.png");
		b.data("checked",false);
	    }else{
		b.children("img").attr("src","checked.png");
		b.data("checked",true);
	    }
	});
	if(checked) b.attr("src","checked.png"); //it defaults to unchecked, so no else needed here.
	if(!fromLocal){
	    l = localStorage.getItem("listItems");
	    l.push(checked,itemName);
	    localStorage.setItem("listItems",l);
	}
	c.insertBefore($("#add-item-row"));
	$("#add-input").val("");
    }
    localStorage.getItem("listItems").foreach(function(ob){addItem(ob[1],ob[0])});
    $("#add-input").on('keydown',function(e){
	if(e.which == 13)
	    addItem();
    });
    $("#add-button").on('mousedown', function(e){
	$(e.target).attr("src","add-box-inset.png");
    }).on('mouseup',function(e){
	addItem();
	$(e.target).attr("src","add-box.png");
    });
});
