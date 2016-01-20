define( [ "troopjs-browser/component/widget", "troopjs-browser/store/local", "when", "jquery", "template!./item.html"], function ListModule(Widget, store, when, $, template){
	var STORE = "juice";
	var LOCK = "lock";
	var LOCK_BOOK = "lock_book";
	var SELECTED_CLASS = "fruit_item_select";

	function filter(item) {
		return item === null;
	}
	function DefaultMenu () {
		return [
		{"Category":"鲜榨果蔬汁","Name":"甘蔗汁(生津润燥)","NameEn":"Sugar-Cane","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"黄瓜汁(排毒瘦身)","NameEn":"Cucumber","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"冬瓜汁(消肿减肥)","NameEn":"White Gourd","Price":8,"MemberPrice":6,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"双瓜果菜汁(降火排毒)","NameEn":"Watermelon-Cucumberl","Price":0,"MemberPrice":8,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"胡萝卜汁(明眼抗衰老)","NameEn":"Carrot","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"黄瓜梨汁(清热润肺)","NameEn":"Cucumber.Pear","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"胡萝卜梨汁(护目润肺)","NameEn":"Carrot-Pear","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"梨汁(润肺养肝)","NameEn":"Pear","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"芹菜汁(降压养血)","NameEn":"Celery","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"甘蔗柚子汁(清热润燥)","NameEn":"Sugar-Cane-Shaddock","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"芹菜梨汁(润肺降火)","NameEn":"Celery-Pear","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"西瓜梨汁(排毒润肺)","NameEn":"Watermelon -Pear","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"芹菜胡萝卜汁(降压明目)","NameEn":"Celery-Carrot","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"番茄柠檬汁(提亮肌肤)","NameEn":"Tomato -Lemon","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"甘蔗梨汁(润肺润燥)","NameEn":"Sugar-Cane-Pear","Price":12,"MemberPrice":10,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"冬瓜葡萄汁(分解油脂)","NameEn":"White Gourd-Grape","Price":13,"MemberPrice":11,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苹果冬瓜汁(益肾瘦身)","NameEn":"Apple-White Gourd","Price":13,"MemberPrice":11,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苹果汁(止泻润肺)","NameEn":"Apple","Price":13,"MemberPrice":11,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苹果雪梨汁(助消化润肺)","NameEn":"Apple-Pear","Price":13,"MemberPrice":11,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"西瓜汁(利尿排毒)","NameEn":"Watermelon","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"胡萝卜苹果汁(增强抵抗力)","NameEn":"Carrot-Apple","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"西瓜葡萄汁(美颜抗衰老)","NameEn":"Watermelon-Grape","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"哈密瓜汁(造血生津)","NameEn":"Hami Melon","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"胡萝卜苹果姜汁(明目益脾)","NameEn":"Carrot-Apple-Ginger","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苦瓜苹果汁(排毒瘦身)","NameEn":"Bitter Gourd-Apple","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"甘蔗番茄汁(清热解毒)","NameEn":"Sugar-Cane -Tomat","Price":0,"MemberPrice":14,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"柚子梨汁(润肺化痰)","NameEn":"Shaddock.Pear","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"甜菜根汁(护肝补血)","NameEn":"Beet Root","Price":14,"MemberPrice":12,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"菠萝橙汁(助消化美颜)","NameEn":"Pineapple-Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苹果菠萝老姜汁(生理期特饮)","NameEn":"Apple-Pineapple Ginger","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"啥密瓜菠萝汁(降脂减肥)","NameEn":"Hami Melon-Pineapple","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"芹菜苦瓜汁(清体排毒)","NameEn":"Celery-Bitter Gourd","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苦瓜梨汁(养肝润燥)","NameEn":"Bitter Gourd- Pear","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苹果橙汁(加强新陈代谢)","NameEn":"Apple.Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"雪莲果橙汁(降脂解毒)","NameEn":"Yacon-Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"黄瓜苹果橙汁(美颜瘦身)","NameEn":"Cucumber Apple Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"胡萝卜橙汁(防电脑辐射)","NameEn":"Carrot-Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"鲜榨橙汁(抗氧化)","NameEn":"Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"芦荟鲜橙汁(抗衰老润肤)","NameEn":"Aloe-Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"雪梨橙汁(润肺降脂)","NameEn":"Pear-Orange","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苦瓜汁(清体益肾养肝)","NameEn":"Bitter Gourd","Price":16,"MemberPrice":14,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苹果葡萄汁(美颜抗衰老)","NameEn":"Apple-Grape","Price":16,"MemberPrice":14,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"葡萄橙汁(补血益气)","NameEn":"Grape-Orange","Price":17,"MemberPrice":15,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"果肉橙汁(补充纤维)","NameEn":"Orange","Price":17,"MemberPrice":15,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"西柚梨汁(瘦身降火)","NameEn":"Grapefruit- Pear","Price":17,"MemberPrice":15,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"西柚橙汁(降火补血)","NameEn":"Grapefruit-Orange","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"芒果橙汁(润泽肌肤)","NameEn":"Mango-Orange","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"奇异果橙汁(补叶酸)","NameEn":"Kiwi-Orange","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"草莓甘蔗汁(抗衰老补血)","NameEn":"Strawberry Sugar-cane","Price":20,"MemberPrice":18,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"新奇士汁(去油脂)","NameEn":"Sunkist Orange","Price":20,"MemberPrice":18,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"苹果菠萝汁(增强免疫力)","NameEn":"Apple- Pineapple","Price":20,"MemberPrice":18,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"甘蔗石榴汁(抗衰老补血)","NameEn":"Sugar-CanePomegranate","Price":20,"MemberPrice":18,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"石榴梨汁(抗衰老润肺)","NameEn":"Pomegranate- Pear","Price":20,"MemberPrice":18,"IsSelected":true},
		{"Category":"鲜榨果蔬汁","Name":"草莓橙汁(润肺生津)","NameEn":"Strawberry-Orange","Price":23,"MemberPrice":20,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"葡萄汁(补肝肾)","NameEn":"Grape","Price":23,"MemberPrice":20,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"蓝莓橙汁(护眼润肤)","NameEn":"Blueberry-Orange","Price":28,"MemberPrice":25,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"菠萝汁(助消化)","NameEn":"Pineapple","Price":30,"MemberPrice":26,"IsSelected":false},
		{"Category":"鲜榨果蔬汁","Name":"石榴汁(美容圣品)","NameEn":"Pomegranate","Price":35,"MemberPrice":30,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"香蕉优(补充精力)","NameEn":"Banana Yogurt","Price":11,"MemberPrice":10,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"哈密瓜优(清凉消暑)","NameEn":"Hami Melon Yogurt","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"菠萝木瓜优(瘦身美颜)","NameEn":"Pineapple Papaya Yogurt","Price":16,"MemberPrice":14,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"香蕉木瓜优(丰盈润肤)","NameEn":"Banana PapayaYogurt","Price":16,"MemberPrice":14,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"芒果香蕉优(消炎润肠)","NameEn":"Mango Banana Yogurt","Price":17,"MemberPrice":15,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"木瓜优(美肤丰盈)","NameEn":"Papaya Yogurt","Price":17,"MemberPrice":15,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"芒果优(护目润肤)","NameEn":"Mango Yogurt","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"火龙果优(抗衰老)","NameEn":"Pitaya Yogurt","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"芒果木瓜优(润肤美颜)","NameEn":"Mango-Papaya Yogurt","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"草莓优(滋养补血)","NameEn":"Strawberry Yogurt","Price":21,"MemberPrice":19,"IsSelected":false},
		{"Category":"健康全能优酪乳","Name":"蓝莓优(增强视力)","NameEn":"Blueberry Yogurt","Price":23,"MemberPrice":27,"IsSelected":false},
		{"Category":"颗粒优","Name":"西瓜果粒优(利尿排毒)","NameEn":"Watermelon Grain Yogurt","Price":15,"MemberPrice":12,"IsSelected":false},
		{"Category":"颗粒优","Name":"香蕉果粒优(补充精力)","NameEn":"Banana Grain Yogurt","Price":16,"MemberPrice":14,"IsSelected":false},
		{"Category":"颗粒优","Name":"木瓜果粒优(美肤丰盈)","NameEn":"Papaya Grain Yogurt","Price":17,"MemberPrice":15,"IsSelected":false},
		{"Category":"颗粒优","Name":"哈密瓜果粒优(清凉消暑)","NameEn":"Hami Melon Grain Yogurt","Price":17,"MemberPrice":15,"IsSelected":false},
		{"Category":"颗粒优","Name":"芒果果粒优(护目润肤)","NameEn":"Mango-GrainYogurt","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"颗粒优","Name":"火龙果果粒优(护衰老)","NameEn":"Pitaya-Grain Yogurt","Price":18,"MemberPrice":16,"IsSelected":false},
		{"Category":"颗粒优","Name":"奇异果果粒优(护衰老)","NameEn":"Kiwi Grain Yogurt","Price":20,"MemberPrice":18,"IsSelected":false},
		{"Category":"颗粒优","Name":"草莓果粒优(滋养补血)","NameEn":"Strawberry Grain Vogurt","Price":22,"MemberPrice":20,"IsSelected":false},
		{"Category":"果汁牛奶","Name":"西瓜牛奶(消暑健体)","NameEn":"Watermelon Milk","Price":13,"MemberPrice":11,"IsSelected":false},
		{"Category":"果汁牛奶","Name":"香蕉牛奶(补充精力)","NameEn":"Banana Milk","Price":15,"MemberPrice":13,"IsSelected":false},
		{"Category":"果汁牛奶","Name":"木瓜牛奶(润肤美颜)","NameEn":"Papaya Milk","Price":16,"MemberPrice":14,"IsSelected":false},
		{"Category":"果汁牛奶","Name":"木瓜香蕉牛奶(丰盈润肤)","NameEn":"Papaya Banana Milk","Price":16,"MemberPrice":14,"IsSelected":false},
		{"Category":"果汁牛奶","Name":"芒果香蕉牛奶(消除疲劳)","NameEn":"Mango Banana Milk","Price":17,"MemberPrice":15,"IsSelected":false}];
	}
	function RemoteMenu()
	{
		$.ajax({url : "http://localhost/Juice/Data/Default/Menu"})
		.done(function(response)
		{
			alert(response[0].Name);
		})
		return when
	}
	function Book(o){
		var text = $(o).html();
		var op = o.parentNode;
		var num = $(op.children[0]);
		var i = parseInt(num.html());
		var li = op.parentNode;
		if(text == "-")
		{
			if (i > 0) {
				i --;
				num.html(i);
			};
			if (i == 0 && $(li).hasClass(SELECTED_CLASS)) {
				$(li).removeClass(SELECTED_CLASS);
			};
		}
		if(text == "+")
		{
			if (!$(li).hasClass(SELECTED_CLASS)) {
				$(li).addClass(SELECTED_CLASS);
			};
			i++;
			num.html(i);
		}
	}
	return Widget.extend({
		"sig/start" : function () {
			var self = this;

			// Wait for and update store LOCK
			return store[LOCK] = when(store[LOCK], function () {
				// Get STORE
				return store.get(STORE).then(function (getItems) {
					// Set STORE
					return store.set(STORE, getItems === null ?
					 DefaultMenu()
					 : $.grep(getItems, filter, true)).then(function (setItems) {
						// Iterate each item
						$.each(setItems, function itemIterator(i, item) {
							// Append to self
							self.append(template, {
								"i": i,
								"item": item
							});
						});
						// Publish
						//self.publish("todos/change", setItems);
					});
				});
			});
		},
		"dom:info/click" : function(item){
			var self = item.currentTarget;
			Book($(self).next("op").children("o").eq(2)[0])
		},
		"dom:o/click" : function(item)
		{
			return Book(item.currentTarget);
		}
	});
});