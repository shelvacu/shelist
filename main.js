if(!localStorage.getItem("listItems")){
    //init
    localStorage.setItem("listItems",'[]');
}
function updateLocal(func,arg){
    a = window.localStorage.getItem("listItems");
    b = JSON.parse(a);
    if(typeof arg == 'undefined')
	c = func(b);
    else
	c = func(b,arg);
    d = JSON.stringify(c);
    window.localStorage.setItem("listItems",d);
    //This could be put all on one line, but then it'd be rediculously long.
}
$(document).ready(function(){
    console.log('w00t w00t');
    function update(idx,checked,itemName){
	console.log("idx is", idx);
	if(typeof idx != 'number')
	    idx = $(idx).data("index");
	l = JSON.parse(localStorage.getItem("listItems"));
	if(typeof  checked != 'undefined')
	    l[idx][0] = checked;
	if(typeof itemName != 'undefined')
	    l[idx][1] = itemName;
	localStorage.setItem("listItems",JSON.stringify(l));
    }
    function addItem(itemName,checked,fromLocal){
	//both checked and fromLocal default to false, and undefined is falsy!
	checked   = !!checked
	fromLocal = !!fromLocal
	c = $("#template-row").clone();
	idx = $("#template-row").data("index");
	c.data("index",idx);
	$("#template-row").data("index",idx+1);
	c.attr("id","");
	c.css("visibility","visible");
	if(!itemName) itemName = $("#add-input").val();
	c.find(".item-desc").text(itemName);
	b = c.find(".bigcheck");
	b.on('mousedown touchstart', null, b, function(e){
	    b = e.data;
	    console.log(b,b.data());
	    if( typeof b.data("checked") === 'undefined' )
		b.data("checked",false);
	    if(b.data("checked")){
		b.children("img").attr("src","checked-inset.png");
	    }else{
		b.children("img").attr("src","inset.png");
	    }
	}).on('mouseup', null, b, function(e){
	    b = e.data;
	    isChk = !b.data("checked")
	    b.data("checked",isChk);
	    src = (isChk ? "checked.png" : "unchecked.png");
	    console.log(src,b.children("img"));
	    b.children("img").attr("src",src);
	    update(b.parents("tr:first"),isChk);
	});
	c.find(".remove").on('mousedown touchstart', function(e){
	    $(e.target).attr("src","remove-inset.png");
	}).on('mouseup focusout mouseout blur', function(e){
	    $(e.target).attr("src","remove.png");
	}).on('mouseup', function(e){
	    row = $(e.target).parents("tr:first");
	    updateLocal(function(l,row){
		l.splice(row.data("index"),1);
		return l;
	    },row);
	    console.log(row,row.nextUntil);
	    //Since we're removing this, all the indexes need to be decremented.
	    row.nextUntil('#add-item-row').each(function(i){ //I love jquery
		$(this).data('index',$(this).data('index')-1);
	    });
	    row.remove();
	});
	    
	if(checked){
	    b.children('img').attr("src","checked.png");
	    b.data("checked",true);
	}
	if(!fromLocal){
	    l = JSON.parse(localStorage.getItem("listItems"));
	    l.push([checked,itemName]);
	    localStorage.setItem("listItems",JSON.stringify(l));
	}
	c.insertBefore($("#add-item-row"));
	$("#add-input").val("");
    }
    console.log(localStorage.getItem("listItems"));
    JSON.parse(localStorage.getItem("listItems")).forEach(function(ob){
	addItem(ob[1],ob[0],true);
    });

    $("#add-input").on('keydown',function(e){
	if(e.which == 13)
	    addItem();
    });
    $("#add-button").on('mousedown touchstart', function(e){
	$(e.target).attr("src","add-box-inset.png");
    }).on('mouseup',function(e){
	addItem();
	$(e.target).attr("src","add-box.png");
    });
});
