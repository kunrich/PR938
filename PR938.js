function PR938(dom){
	let c=typeof dom;
	if(c=='string')dom=document.getElementById(dom);
	else if(!(c=='object'&&dom.isConnected))return {};

	let i={
		info:'PR938',
		version:'6.1',
		mode:'video',
		quality:0,
		_width:0,
		_height:0,
		id:{},
		hls:0,
		interval:0,
		outmenu:0,
		autoplay:0,
		callback:{},
		tErr:{
			1:'กระบวนการดึงข้อมูลถูกยกเลิกโดยผู้ใช้',
			2:'เกิดข้อผิดพลาดขณะดาวน์โหลด',
			3:'เกิดข้อผิดพลาดขณะถอดรหัส',
			4:'ไม่รองรับวิดีโอ',
			5:'ไม่พบแหล่งที่มาของวิดีโอ',
		},
		svg:{
			xplay:{
				view:'0 0 32 32',
				path:'M12.889 10.667l8.889 5.333-8.889 5.333z'
			},
			replay:{
				view:'0 0 24 24',
				path:'M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z'
			},
			play:{
				view:'0 0 24 24',
				path:'M3 22v-20l18 10-18 10z'
			},
			next:{
				view:'0 0 24 24',
				path:'M20 22v-20h2v20h-2zm-18 0l16-10-16-10v20z'
			},
			pause:{
				view:'0 0 24 24',
				path:'M2.25,24h6V0h-6V24z M15.75,24h6V0h-6V24z'
			},
			unmute:{
				view:'0 0 24 24',
				path:'M-0.001,8v8h5.335L12,22.668V1.335L5.334,8H-0.001zM17.998,11.999c0-2.359-1.356-4.385-3.328-5.373v10.732C16.642,16.387,17.998,14.358,17.998,11.999zM14.67,0.307v2.748c3.852,1.145,6.662,4.719,6.662,8.945c0,4.229-2.811,7.799-6.662,8.95v2.746c5.347-1.215,9.328-5.991,9.328-11.696C23.998,6.293,20.017,1.521,14.67,0.307z'
			},
			unmute_half:{
				view:'0 0 24 24',
				path:'m-0.001,8l0,8l5.335,0l6.666,6.668l0,-21.333l-6.666,6.665l-5.335,0zm17.999,3.999c0,-2.359,-1.356,-4.385,-3.328,-5.373l0,10.732c1.972,-0.971,3.328,-3,3.328,-5.359z'
			},
			mute:{
				view:'0 0 24 24',
				path:'M18,12c0-2.36-1.363-4.388-3.336-5.374v2.948l3.271,3.266C17.973,12.572,18,12.294,18,12zM21.336,12c0,1.252-0.271,2.43-0.72,3.523l2.011,2.01C23.505,15.879,24,14,24,12c0-5.706-3.99-10.481-9.336-11.692v2.744C18.523,4.201,21.336,7.775,21.336,12zM1.692,0L0,1.692L6.308,8H0v8h5.332L12,22.664v-8.973l5.664,5.672c-0.889,0.692-1.889,1.235-3,1.571v2.747c1.841-0.411,3.513-1.27,4.924-2.411L22.309,24L24,22.309l-12-12L1.692,0z M12,1.332 L9.215,4.121L12,6.907V1.332z'
			},
			fullscreen:{
				view:'0 0 24 24',
				path:'M0,9h3V3h6V0H0V9L0,9zM0,9h3V3h6V0H0V9L0,9zM15,0v3h6v6h3V0H15L15,0zM15,0v3h6v6h3V0H15L15,0zM21,21h-6v3h9v-9h-3V21L21,21zM21,21h-6v3h9v-9h-3V21L21,21zM3,15H0v9h9v-3H3V15L3,15zM3,15H0v9h9v-3H3V15L3,15z'
			},
			unfullscreen:{
				view:'0 0 24 24',
				path:'M6,6H0v3h9V0H6V6L6,6zM6,6H0v3h9V0H6V6L6,6zM18,6V0h-3v9h9V6H18L18,6zM18,6V0h-3v9h9V6H18L18,6zM15,24h3v-6h6v-3h-9V24L15,24zM15,24h3v-6h6v-3h-9V24L15,24zM0,18h6v6h3v-9H0V18L0,18zM0,18h6v6h3v-9H0V18L0,18z'
			},
			setting:{
				view:'0 0 24 24',
				path:'M19 0h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4 4h2v3h-2v-3zm-8 0h2v8h-2v-8zm4 13h-2v3h-2v-3h-2v-3h6v3zm8-5h-2v8h-2v-8h-2v-3h6v3z'
			},
			load:{
				view:'0 0 32 32',
				path:'M16 32c-4.274 0-8.292-1.664-11.314-4.686s-4.686-7.040-4.686-11.314c0-3.026 0.849-5.973 2.456-8.522 1.563-2.478 3.771-4.48 6.386-5.791l1.344 2.682c-2.126 1.065-3.922 2.693-5.192 4.708-1.305 2.069-1.994 4.462-1.994 6.922 0 7.168 5.832 13 13 13s13-5.832 13-13c0-2.459-0.69-4.853-1.994-6.922-1.271-2.015-3.066-3.643-5.192-4.708l1.344-2.682c2.615 1.31 4.824 3.313 6.386 5.791 1.607 2.549 2.456 5.495 2.456 8.522 0 4.274-1.664 8.292-4.686 11.314s-7.040 4.686-11.314 4.686z'
			},
			quality:{
				view:'0 0 24 24',
				path:'M6 18h-2v5h-2v-5h-2v-3h6v3zm-2-17h-2v12h2v-12zm11 7h-6v3h2v12h2v-12h2v-3zm-2-7h-2v5h2v-5zm11 14h-6v3h2v5h2v-5h2v-3zm-2-14h-2v12h2v-12z'
			},
			rate:{
				view:'0 0 24 24',
				path:'M9 16.985v-10.021l9 5.157-9 4.864zm4-14.98c5.046.504 9 4.782 9 9.97 0 1.467-.324 2.856-.892 4.113l1.738 1.006c.732-1.555 1.154-3.285 1.154-5.119 0-6.303-4.842-11.464-11-11.975v2.005zm-10.109 14.082c-.568-1.257-.891-2.646-.891-4.112 0-5.188 3.954-9.466 9-9.97v-2.005c-6.158.511-11 5.672-11 11.975 0 1.833.421 3.563 1.153 5.118l1.738-1.006zm17.213 1.734c-1.817 2.523-4.769 4.175-8.104 4.175s-6.288-1.651-8.105-4.176l-1.746 1.011c2.167 3.122 5.768 5.169 9.851 5.169 4.082 0 7.683-2.047 9.851-5.168l-1.747-1.011z'
			},
			rich:{
				view:'0 0 24 24',
				path:'M24,5.8c0,4.527-4.5,5.8-4.5,5.8L19,9c0,0,2-0.563,2-2.987c0-4.488-7-4.384-7,0C14,8.438,16,9,16,9l-0.5,2.6c0,0-4.5-1.558-4.5-5.8C11-1.846,24-1.888,24,5.8zM3,5.5c3.456,0,7,1.275,7,5.5c0,3.844-3,5-3,5l3,8H6.5L4,16.5H3V24H0V5.5H3zM3,8v6c0,0,4,0.563,4-3C7,7.531,3,8,3,8zM12.2,14H24v3h-4.5v4H24v3H13l-1.2-3H16v-4H9.5c0,0,0.672-0.203,1.5-1C12.003,15.034,12.2,14,12.2,14zM0,0v3h9.2c0,0,0.562-1.363,1.2-2c0.769-0.769,1.5-1,1.5-1H0z'
			},
			back:{
				view:'0 0 32 32',
				path:'M19.41,20.09,14.83,15.5,19.41,10.91,18,9.5l-6,6,6,6z'
			},
			check:{
				view:'0 0 24 24',
				path:'M9,16.2L4.8,12l-1.4,1.4L9,19,21,7l-1.4-1.4L9,16.2z'
			},
			
		},
		xsvg:function(view,path,style){
			var s=view.split(' ');
			return "data:image/svg+xml;base64,"+this.base64('<svg xmlns="http://www.w3.org/2000/svg" width="'+s[2]+'" height="'+s[3]+'" viewBox="'+view+'"><path style="'+(this.has(style)?style:'fill:#fff;stroke:#000;stroke-opacity:.1;stroke-width:2px;')+'" d="'+path+'"/></svg>')
		},
		csvg:function(name,svg,style){
			return '.'+this.info+'-svg-'+name+'{background-image:url('+this.xsvg(svg.view,svg.path,style)+')}'
		},
		base64:function(r){
			var a,t,o,e,h,n,d=0,C="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			for(r=function(r){
				r=r.replace(/\r\n/g,"\n");
				for(var a="",t=0;t<r.length;t++){
					var o=r.charCodeAt(t),s=String.fromCharCode;
					o<128?a+=s(o):(127<o&&o<2048?a+=s(o>>6|192):(a+=s(o>>12|224),a+=s(o>>6&63|128)),a+=s(63&o|128))
				}
				return a
			}(r);d<r.length;)
				o=(n=r.charCodeAt(d++))>>2,
				e=(3&n)<<4|(a=r.charCodeAt(d++))>>4,
				h=(15&a)<<2|(t=r.charCodeAt(d++))>>6,
				n=63&t,isNaN(a)?h=n=64:isNaN(t)&&(n=64),
				C=C+c.charAt(o)+c.charAt(e)+c.charAt(h)+c.charAt(n);
			return C
		},
		create:function(name,box,tag,obj){
			let cr=this.xnew(typeof box=='string'?this.id[box]:box,tag);
			if(name!='')this.id[name]=cr;
			
			if(this.has(obj)){
				if(this.has(obj.set))
					for(x in obj.set)
						cr[x]=obj.set[x];
				if(this.has(obj.css))
					for(x in obj.css)
						cr.css(x,obj.css[x]);
				if(this.has(obj.on))
					for(x in obj.on)
						cr.on(x,obj.on[x]);
				if(this.has(obj.run))
					obj.run(cr,this);
				if(this.has(obj.satb))
					for(x in obj.satb)
						cr.satb(x,obj.satb[x]);
				if(this.has(obj.html))
					cr.html(obj.html);
			}
			return cr
		},
		has:function(a){
			return typeof a!='undefined'
		},
		xnew:function(to,q){
			let z,tag='div',css='';
			if(q.search(/[\.]/)!=-1){
				while(q!=''){
					let s='';
					if(q[0]=='.'){
						s=q[0];
						q=q.substr(1);
					}

					let w=q.search(/[\.]/);
					if(w==-1)w=q.length;
					let r=q.substr(0,w);
					if(r!=''){
						if(s=='.')css+=(css==''?'':' ')+this.info+'-'+r;
						else if(s=='')tag=r;
					}
					q=q.substr(w);
				}
			}else tag=q;
			z=this.tool(document.createElement(tag));
			if(css!='')z.satb('class',css);
			to.appendChild(z);
			return z
		},
		tool:function(id){
			if(id.hasOwnProperty('r938'))return id;
			id.r938=this;
			id.on=function(e,f){
				this.addEventListener?this.addEventListener(e,f,0):this.attachEvent?this.attachEvent('on'+e,f):this['on'+e]=f;
				return this
			};
			id.newsvg=function(a){
				if(this.hasOwnProperty('ic'))this.ic.remove();
				this.ic=this.xnew('ic.svg-'+a);
				return this
			};
			id.xnew=function(a){return this.r938.xnew(this,a)};
			id.remove=function(){
				let a=this.parentNode;
				if(a!=null)
					a.removeChild(this);
				return this
			};
			id.gatb=function(a){this.getAttribute(a);return this};
			id.satb=function(a,b){this.setAttribute(a,b);return this};
			id.ratb=function(a){this.removeAttribute(a);return this};
			id.css=function(a,b,c){
				if(c){
					if(this.style[a]!=b)
						this.style[a]=b
				}else this.style[a]=b;
				return this
			};
			id.q=function(a){
				a=this.querySelector(a);
				return a==null?0:this.r938.tool(a)
			};
			id.qs=function(a){return this.querySelectorAll(a)};
			id.html=function(a,b){
				if(typeof a=='undefined')a='';
				if(b){
					if(this.innerHTML!=a)
						this.innerHTML=a
				}else this.innerHTML=a;
				return this
			};
			return id
		},
		fortime:function(t){
			var i,e,s="00:00";
			return (typeof t=="number")&&!isNaN(t)&&(s=(0!=(i=Math.floor(t/3600))?(i<10?0:'')+i+':':'')+((e=Math.floor((t-3600*i)/60))<10?0:'')+e+':'+((e=t.toFixed()-3600*i-60*e)<10?0:'')+e),s
		},
		slide:function(id,add,set){
			let bar=this.xnew(id,'div'),
			t=this.xnew(bar,'div'),
			r;
			bar.dom={box:t};
			let n="5px",
				o="5px",
				l="15px",
				a="10px";
				
			if(this.has(set))
				for(let x in set)
					"t"==x?n=set[x]:"h"==x?o=set[x]:"s"==x?l=set[x]:"p"==x&&(a=set[x]);
				
			bar.css('cursor','pointer')
			.css('padding','0 '+a)
			.css('height',l);
			
			t.css('position','relative')
			.css('height',l)
			.css('width','100%');
			
			(bar.dom.back=this.xnew(t,'div'))
			.css('top',n)
			.css('position','absolute')
			.css('borderRadius','2px')
			.css('width','100%')
			.css('height',o)
			.css('background',add[0])
			.css('zIndex',h+2);
			
			for(var h=0;h<add.length-1;h++){
				(bar.dom[h]=this.xnew(t,'div'))
				.css('top',n)
				.css('position','absolute')
				.css('borderRadius','2px')
				.css('width',add[h+1]==''?'100%':0)
				.css('height',o)
				.css('background',add[h+1])
				.css('zIndex',h+2)
			}
			
			return (bar.dom.move=this.xnew(t,'div'))
			.css('position','absolute')
			.css('borderRadius','2px')
			.css('width','100%')
			.css('height','100%')
			.css('zIndex','10')
			.css('touchAction','pan-y'),
			bar.process=function(t){
				var i=event.target.getBoundingClientRect();
				((t=((t=100*(t-i.left)/i.width)<0?0:100<t?100:t).toFixed(2))!=this.value||(new Date).getTime()-this.xtime>200)&&(this.value=t,
				this.xtime=(new Date).getTime(),
				(typeof this.change=="function")&&this.change(this.value))
			},
			bar.load=function(id,wid){
				if(this.dom.hasOwnProperty(id)){
					this.dom[id].css('width',parseFloat(wid).toFixed(2)+'%')
				}
			},
			r=function(){
				this.process(event.changedTouches[0].pageX)
			},
			bar.on("touchstart",r),
			bar.on("touchmove",r),
			bar.on("pointerdown",function(){
				var t=event.target;
				t.setPointerCapture(event.pointerId),
				t.classList.add("r938-slide"),
				this.process(event.clientX)
			}),
			bar.on("pointermove",function(){
				var t=event.target;
				(t.hasPointerCapture&&t.hasPointerCapture(event.pointerId)||t.classList.contains("r938-slide"))&&this.process(event.clientX)
			}),
			bar.on("pointerup",function(){
				event.target.classList.remove("r938-slide"),
				this.process(event.clientX)
			}), 
			bar
		},
		addMenu:function(obj){
			let name='LM';
			if(!this.id.hasOwnProperty(name+'mBox')){
				this.create(name+'mBox','menu','.mBox');
				this.create(name+'mClose',name+'mBox','.mTable.mHead.mClose',{
					on:{
						click:function(){this.r938.btmenu()}
					}
				});
				this.create(name+'close',name+'mClose','.mRow',{
					on:{
						click:function(){
							this.r938.btmenu()
						}
					}
				});
				this.create('',name+'close','.mCell.mIcon').xnew('button.mIcon').newsvg('back');
				this.create('',name+'close','.mCell',{html:'ออก'});
				this.create('',name+'close','.mCell');
				this.create(name+'mTable',name+'mBox','.mTable');
			}
			
			for(let i in obj){
				let x=obj[i];
				let row=name+x[0];
				this.create(row,name+'mTable','.mRow',{
					set:{
						cc:(i*1)+1,
						use:function(){
							let i=this.r938;
							let r=this.cc;
							i.id.menu.qs('.'+i.info+'-mBox').forEach(function(a,b){
								a.css('display',b===r?'':'none')
							});
							i.automenu()
						}
					},
					on:{
						click:x.hasOwnProperty(3)?x[3]:function(){this.use()}
					}
				});
				this.create('',row,'.mCell.mIcon').xnew('button.mIcon').newsvg(x[0]);
				this.create('',row,'.mCell',{html:x[1]});
				this.create(x[0]+'Label',row,'.mCell.mDes',{html:x[2]});
				
				let list=x[0];
				let event=x[0]+'Event';
				this.create(list+'mBox','menu','.mBox',{
					css:{display:'none'}
				});
				this.create(event,list+'mBox','.mTable.mHead',{
					set:{
						box:x[0]+'List',
						list:[],
						clear:function(){
							for(let x of this.list)x.remove();
							this.list=[]
						},
						html:function(c){
							return this.r938.id[this.box].html(c)
						},
						add:function(label,event){
							let i=this.r938;
							let b=i.id[this.box];
							if(this.list.length==0)b.html();
							let menu=b.xnew('.mRow').on('click',event);
							menu.ic=menu.xnew('.mCell.mIcon').xnew('button.mIcon').newsvg('').ic;
							menu.xnew('.mCell').html(label);
							menu.xnew('.mCell');
							menu.set=function(c){
								this.ic.classList[c?'add':'remove'](this.r938.info+'-svg-check')
							};
							this.list.push(menu);
							return menu
						}
					},
					on:{
						click:function(){
							let i=this.r938;
							i.id.menu.qs('.'+i.info+'-mBox').forEach(function(a,b){
								a.css('display',b===0?'':'none',1)
							});
							i.automenu()
						}
					}
				});
				this.create(list+'mRow',event,'.mRow');
				this.create('',list+'mRow','.mCell.mIcon').xnew('button.mIcon').newsvg('back');
				this.create('',list+'mRow','.mCell',{html:x[1]});
				this.create('',list+'mRow','.mCell');
				
				this.create(x[0]+'List',list+'mBox','.mTable');
			}
		},
		door:function(run,out){
			if(!this.id.dom.isConnected)return 0;
			let obj=this.callback[run];
			if(typeof obj=='object'&&typeof obj.push=='function')
				for(let x of this.callback[run])
					if(typeof x=='function')x(out)
		},
		rerate:function(){
			let v=this.id.video;
			let l=this.id.rateEvent.list;
			let i=1,r={};
			for(let x of l){
				if(x.rate==v.playbackRate)x.set(1),i=0,this.id.rateLabel.html(x.rate===1?'ปกติ':x.rate,1);
				else x.set(0);
			}
			if(i)v.playbackRate=1;
			else this.door('rate',v.playbackRate);
		},
		revolume:function(){
			let v=this.id.video;
			ic=this.info+'-'+(v.volume==0||1==v.muted?'svg-mute':(v.volume>.5?'svg-unmute':'svg-unmute_half'));
			this.id.btVolume.ic.satb('class',ic);
			this.id.barVolume.mybar.load(0,v.volume*100);
			this.door('volume',v.volume)
		},
		replay:function(){
			let v=this.id.video;
			let dura=this.duration();
			var ic=this.info+'-'+(v.paused?(dura!=0&&v.currentTime==dura?'svg-replay':'svg-play'):'svg-pause');
			this.id.btPlay.ic.satb('class',ic);
			this.door('play',v.paused?false:true)
		},
		reend:function(){
			this.imenu(1);
			this.door('end')
		},
		reerror:function(){
			let v=this.id.video;
			if(v.networkState==3)
				v.err=5;
			else v.err=v.error.code;
			this.door('play',v.paused?false:true)
		},
		reload:function(){
			this.door('load',this)
		},
		rescreen:function(){
			let v=this.id.video;
			let check=this.checkscreen();
			let full=this.screenEnabled()||typeof v.webkitEnterFullscreen=='function';
			this.id.btFullscreen.ic.satb('class',this.info+'-svg-'+(check?'un':'')+'fullscreen');
			this.id.btFullscreen.ic.css('opacity',full?'':'.5');
			this.door('screen',check)
		},
		btplay:function(){
			var i=this.id.video,n=i.paused;
			i[n?'plays':'pause']();
			this.imenu(n?0:1)
		},
		btmenu:function(id){
			this.id.menu.css('display',id?'':'none',1)
			.qs('.'+this.info+'-mbox').forEach(function(a,b){
				if(b===0&&id)
					a.css('display','',1);
				else a.css('display','none',1);
			});
			if(!id)this.id.menu.css('height','',1);
			this.automenu()
		},
		automenu:function(){
			let menu=this.id.menu,
			code=this.id.code,
			b=code.getBoundingClientRect(),
			h=b.height,
			w=b.width;
			this.id.dom.classList[h>250&&w>380?'remove':'add'](this.info+'-full');
			for(let a of menu.qs('.'+this.info+'-mBox')){
				if(a.style.display!='none'){
					let i=0;
					for(let p of a.qs('.'+this.info+'-mTable'))
						i+=p.scrollHeight;
					if(h>250){
						let fix=64+36,
						op=i+fix>h,
						set=(op?h-fix:i)+'px',
						over=op?'':'hidden';
						a.css('overflow',over,1);
						menu.css('height',set,1);
					}else a.css('overflow','',1);
					
					break;
				}
			}
		},
		btscreen:function(){
			this.screen()
		},
		btmuted:function(){
			var v=this.id.video;
			v.muted==0&&v.volume<.05?(v.muted=0,v.volume=.2):v.muted=!v.muted
		},
		duration:function(){
			var v=this.id.video;
			if(isNaN(v.duration))return 0;
			else return v.duration;
		},
		screenEnabled:function(){
			let i=document;
			return i.fullscreenEnabled||i.webkitFullscreenEnabled||i.msFullscreenEnabled?true:false
		},
		checkscreen:function(){
			let i=document;
			return i.fullscreenElement||i.webkitFullscreenElement||i.msFullscreenElement||i.mozFullscreenElement?true:false
		},
		screen:function(){
			let i=document,t=this.id.container,p=function(){return 0};
			if(this.screenEnabled()){
				t.full=t.requestFullscreen||t.webkitRequestFullScreen||t.mozRequestFullScreen||t.msRequestFullscreen||p;
				i.unfull=i.exitFullscreen||i.webkitExitFullscreen||i.webkitCancelFullScreen||i.mozCancelFullScreen||i.msExitFullscreen||p;
				this.checkscreen()?i.unfull():t.full()
			}else{
				let v=this.id.video;
				if(typeof v.webkitEnterFullscreen=='function')
					v.webkitEnterFullscreen();
			}
			this.rescreen()
		},
		loadfile:function(q){
			let one=0,list=[];
			this.id.qualityEvent.clear();
			this.id.qualityLabel.html();
			this.id.current.html('00:00');
			this.id.duration.html('00:00');
			this.id.timeBar.mybar.dom[0].html();
			this.id.timeBar.mybar.load(1,0);
			for(let x in q){
				let sp=q[x];
				if(sp.hasOwnProperty('label')&&sp.hasOwnProperty('file')){
					let qu=this.id.qualityEvent.add(sp.label,function(){
						let i=this.r938;
						let v=i.id.video;
						
						v.wait=1;
						v.err=0;
						i.id.timeBar.mybar.dom[0].html('',1);
						if(typeof this.file=='function'){
							let play=!v.paused;
							this.file(i);
							v.xtype='hls';
							if(play)v.plays();
						}else if(typeof this.file=='string'){
							v.xtype='mp4';
							let time=v.currentTime,
							rate=v.playbackRate,
							volume=v.volume,
							play=!v.paused;
							v.src=this.file;
							v.load();
							if(play)v.plays();
							v.currentTime=time;
							if(v.playbackRate!=rate)v.playbackRate=rate;
							if(v.volume!=volume)v.volume=volume;
						}else return 0;
						
						i.quality=this.quality;
						for(let x of i.id.qualityEvent.list){
							if(x.quality==i.quality)x.set(1);
							else x.set(0);
						}
						i.id.qualityLabel.html(this.label,1);
						i.door('quality',{
							id:this.quality,
							label:this.label
						});
						
					});
					qu.label=sp.label;
					qu.file=sp.file;
					qu.obj=sp;
					qu.quality=parseInt(x);
					list.push(qu);
					if(sp.hasOwnProperty('default')&&sp.default)
						one=qu;
				}
			}
			if(list.length==0)return 0;
			if(this.has(this.qq)){
				if(list.hasOwnProperty(this.qq))
					one=list[this.qq];
				else one=list.pop();
			}else if(one==0)one=list[0];
			one.click();
			this.upfull();
			if(this.autoplay)
				this.id.video.plays();
			else{
				this.id.video.pause();
				this.id.thumbnail.css('display','');
			}
		},
		imenu:function(code){
			var a=this.id,
			b=a['bgTop'],
			c=a['top'],
			e=a['bgBottom'],
			f=a['controls'],
			k=a['player'],
			v=this.id.video;
			clearTimeout(this.outmenu);
			if(code==1){
				b.style.opacity=1;
				c.style.opacity=1;
				e.style.opacity=1;
				f.style.opacity=1;
				k.style.cursor='';
			}else if(code==0){
				if(!v.paused&&v.err==0){
					b.style.opacity=0;
					c.style.opacity=0;
					e.style.opacity=0;
					f.style.opacity=0;
					k.style.cursor='none';
					this.btmenu()
				}
			}else if(code==2){
				b.style.opacity=1;
				c.style.opacity=1;
				e.style.opacity=1;
				f.style.opacity=1;
				k.style.cursor='';
				this.outmenu=setTimeout(function(a){a.imenu(0);a.id.dom.mouse=1},3e3,this);
			}
		},
		cmenu:function(code){
			var a=this.id,
			b=a.bgTop,
			c=a.top,
			d=a.menu,
			e=a.bgBottom,
			f=a.controls;
			if(code==9){
				return f.style.display==''?1:0;
			}else{
				if(code==1){
					b.css('display','',1);
					c.css('display','',1);
					d.css('display','',1);
					e.css('display','',1);
					f.css('display','',1);
				}else{
					b.css('display','none',1);
					c.css('display','none',1);
					d.css('display','none',1);
					e.css('display','none',1);
					f.css('display','none',1);
				}
			}
		},
		upfull:function(){
			let a=this;
			a.replay();
			a.revolume();
			a.rerate();
			a.rescreen();
			a.automenu();
		},
		update:function(a){
			var b=a.id.code.getBoundingClientRect(),
			v=a.id.video,
			sp=a.id.spinner,
			bs=a.id.spinIcon,
			ms=a.id.spinText,
			w=b.width,
			h=b.height;
			
			let time=v.currentTime,
			cwait=time==v.time;
			if(!cwait)v.time=time;
			
			if(!v.paused){
				a.id.thumbnail.css('display','none',1);
				v.wait=v.cw>1?1:0;
				cwait?v.cw++:v.cw=0;
			}else v.wait=0;
			
			if(v.err>0){
				let txt=a.tErr[v.err];
				if(!v.paused)v.pause();
				a.imenu(1);
				sp.css('opacity','',1);
				bs.css('display','none',1);
				ms.css('display','',1);
				ms.html(txt,1);
			}else{
				ms.html('',1);
				ms.css('display','none',1);
				bs.css('display','',1);
				sp.css('opacity',v.wait?'':'0',1);
			}
			
			if(a.mode=="video"){
				if(!a.cmenu(9))a.cmenu(1)
			}
			if(v.xtype=='hls'&&a.quality==0&&a.hls!=0&&a.hls.loadLevel!=null){
				let hls=a.hls,
				auto=a.id.qualityLabel.q('.'+a.info+'-qAuto');
				if(auto==0)
					auto=a.id.qualityLabel.xnew('span.qAuto');
				
				let i=hls.levels[hls.loadLevel],
				label=typeof i.name=='string'?i.name:(i.height?i.height+'p':'Label'+hls.loadLevel);
				auto.html(label,1);
			}
			
			if(w!=a._width||h!=a._height){
				a.upfull();
				a._width=w;
				a._height=h;
			}
			a.id.bgTop.css('display',a.id.top.innerText==''?'none':'',1);
		},
		mobile:function(){
			var m;
			if((m=window.matchMedia)||(m=window.msMatchMedia))
				return m("(pointer:coarse)").matches;
			return 0
		},
		on:function(mode,call){
			let key=['time','rate','volume','quality','play','end','error','load','screen','keyboard'];
			if(key.includes(mode)&&typeof call=='function'){
				let cb=this.callback;
				if(!cb.hasOwnProperty(mode))
					cb[mode]=[];
				cb[mode].push(call);
			}
			return this
		},
		show:function(id){
			if(!this.id.dom.isConnected)
				this.loadfile([]);
			id.appendChild(this.id.dom);
			clearInterval(this.interval);
			this.interval=setInterval(this.update,100,this);
			return this
		},
		hide:function(){
			clearInterval(this.interval);
			var v=this.id.video;
			if(this.hls!=0){
				this.hls.stopLoad();
				this.hls.destroy();
				this.hls=0;
			}
			v.src='';
			v.load();
			this.id.dom.remove();
			return this
		},
		remove:function(){
			var v=this.id.video;
			if(this.hls!=0){
				this.hls.stopLoad();
				this.hls.destroy();
				this.hls=0;
			}
			v.src='';
			v.load();
			clearTimeout(this.outmenu);
			clearInterval(this.interval);
			v.remove();
			setTimeout(function(a){
				for(let x in a.id)
					a.id[x].remove();
				for(let x in a){
					if(typeof a[x]=='string')
						a[x]='';
					else if(typeof a[x]=='number')
						a[x]=0;
					else if(typeof a[x]=='function')
						a[x]=function(){};
					else if(typeof a[x]=='object')
						a[x]={};
				}
			},0,this);
		},
		setup:function(obj){
			let i=this,tp=typeof obj;
			if(i.hls!=0){
				i.hls.stopLoad();
				i.hls.destroy();
				i.hls=0
			}
			if(!i.id.dom.isConnected)return this;
			if(tp=='string'&&typeof Hls=='function'&&Hls.isSupported()){
				i.hls=new Hls,
				i.hls.loadSource(obj),
				i.hls.attachMedia(i.id.video),
				i.hls.r938=i;
				i.hls.on(Hls.Events.MANIFEST_PARSED,(function(){
					let i=this.r938,
					run=function(){
						this.r938.hls.currentLevel=this.obj.quality
					},
					load=[{label:'Auto',file:run,quality:-1}];
					for(let x in this.levels){
						let d=this.levels[x],
						label=i.has(d.name)?d.name:(i.has(d.height)?d.height+'p':'Label '+x);
						load.push({label:label,file:run,quality:x})
					}
					i.loadfile(load)
				}))
			}else if(tp=='object')
				this.loadfile(obj);
			return this
		},
		oneSet:function(key,val){
			let v=this.id.video;
			let num=parseFloat(val);
			if(key=='time'){
				v.currentTime=isNaN(num)?0:num
			}else if(key=='volume'){
				v.volume=isNaN(num)?1:num
			}else if(key=='rate'){
				v.playbackRate=isNaN(num)?1:num
			}else if(key=='title'){
				this.id.name.html(val);
			}else if(key=='image'){
				this.id.image.css('backgroundImage','url('+val+')')
			}else if(key=='autoplay'){
				this.autoplay=(val==true)
			}else if(key=='titleShow'){
				this.titleShow=(val==true)
			}else if(key=='start'){
				this.qq=isNaN(num)?0:num
			}else if(key=='quality'){
				let q=this.id.qualityEvent.list;
				if(q.hasOwnProperty(num))q[num].click();
			}
		},
		set:function(key,val){
			if(typeof key=='object')
				for(let x in key)
					this.oneSet(x,key[x]);
			else if(typeof key=='string')
				this.oneSet(key,val);
			return this
		},
		get:function(val){
			if(!this.id.dom.isConnected)return null;
			let v=this.id.video;
			if(val=='time'){
				return v.currentTime
			}else if(val=='duration'){
				return v.duration
			}else if(val=='volume'){
				return v.volume
			}else if(val=='rate'){
				return v.playbackRate
			}else if(val=='quality'){
				return this.quality
			}
			return null
		}
	};
	
	i.create('dom',dom,'.dom',{
		set:{
			myevent:function(e,i){
				let f=i.r938.checkscreen();
				if(f)i=i.r938.id.code;
				return {
					w:i.offsetWidth,
					h:i.offsetHeight,
					y:(f?e.clientY:e.pageY)-i.offsetTop,
					x:(f?e.clientX:e.pageX)-i.offsetLeft
				}
			}
		},
		on:{
			contextmenu:function(e){
				e.preventDefault();
				return 0
			},
			mouseout:function(e){
				var i=this,z=i.myevent(e,i);
				if(z.y>=z.h||z.x>=z.w||z.x<=0||z.y<=0){
					this.r938.imenu(0);
					this.mouse=1
				}
			},
			mousemove:function(e){
				if(this.r938.mobile())return 0;
				var i=this,z=i.myevent(e,i);
				if(z.y>z.h-64||i.r938.id.menu.style.display=='')
					this.r938.imenu(1);
				else this.r938.imenu(2);
				if(this.mouse==1)this.mouse=0
			},
			click:function(e){
				if(this.r938.mobile())return 0;
				var i=this,z=i.myevent(e,i);
				if(z.y>z.h-64||i.r938.id.menu.style.display=='')
					this.r938.imenu(1);
				else this.r938.imenu(2)
			}
		}
	});
	i.create('box','dom','.box',);
	i.create('container','box','.container');
	i.create('player','container','.player');
	i.create('code','player','.code',{
		run:function(id){
			id.satb('tabindex','-1');
			var s={},c=0;
			var o=[0,10,20,30,40,50,60,70,80,90];
			for(var i=96;i<=105;i++)
				s[i]=o[c],c++;
			c=0;
			for(var i=48;i<=57;i++)
				s[i]=o[c],c++;
			id.listkey=s
		},
		on:{
			keydown:function(e){
				e.preventDefault();
				let t=e.keyCode,q=this.r938,i=q.id.video;
				
				if (32==t||80==t)q.btplay();
				else if(70==t)q.btscreen();
				else if(67==t)q.imenu(0);
				else if(35==t)i.currentTime=q.duration();
				else if(77==t)q.btmuted();
				else if(38==t)
					t=i.volume+.05,i.volume=t>1?1:t.toFixed(2);
				else if(40==t)
					t=i.volume-.05,i.volume=t<0?0:t.toFixed(2);
				else if(39==t&&q.duration())
					q.id.timeBar.mybar.load(1,(i.currentTime=((t=i.currentTime+5)>q.duration()?q.duration():t))/q.duration()*100),i.paused&&i.plays();
				else if(37==t&&q.duration())
					q.id.timeBar.mybar.load(1,(i.currentTime=((t=i.currentTime-5)<0?0:t))/q.duration()*100),i.paused&&i.plays();
				else if(q.has(this.listkey[t])){
					i.currentTime=q.duration()*this.listkey[t]/100;
					q.id.timeBar.mybar.load(1,this.listkey[t])
				}
				
				q.door('keyboard',e)
			}
		}
	});
	i.create('style','code','style',{
		run:function(id,i){
			var style='';
			for(x in i.svg)
				style+=i.csvg(x,i.svg[x]);
			style+=i.csvg('xload',i.svg.load,'fill:#ccc');
			id.html(style).css('display','none')
		}
	});
	
	i.create('vdo','code','.vdo',{
		on:{
			click:function(){
				let i=this.r938;
				if(i.mobile()){
					i.imenu(i.id.controls.style.opacity==1?0:2);
					return 0
				}
				i.btplay()
			},
			dblclick:function(){
				let i=this.r938;
				if(!i.mobile())i.btscreen()
			}
		}
	});
	
	i.create('video','vdo','video',{
		set:{
			preload:'auto',
			controls:0,
			err:0,
			cw:0,
			wait:1,
			time:-1,
			xtype:'none',
			plays:function(){
				let v=this;
				v.play().catch(function(e){});
				if(v.err==0&&v.paused)
					setTimeout(function(v){v.plays()},1,v)
			}
		},
		on:{
			timeupdate:function(){
				let q=this.r938,
				bar=this.currentTime/q.duration()*100;
				q.id.timeBar.mybar.load(1,bar);
				q.id.current.html(q.fortime(this.currentTime),1);
				q.door('time',this.currentTime)
			},
			durationchange:function(){
				var q=this.r938;
				q.id.duration.html(q.fortime(q.duration()),1);
			},
			waiting:function(){
				this.wait=1
			},
			progress:function(){
				if(this.buffered.length<1)return 0;
				let s,t=this.r938.id.timeBar.mybar.dom[0];
				if(this.xtype=='hls'){
					t.html('',1);
					for(let i=100/this.r938.duration(),e=0;e<this.buffered.length;e++){
						let n=this.buffered.start(e)*i;
						this.r938.xnew(t,'div')
						.css('position','absolute')
						.css('borderRadius','2px')
						.css('background','rgba(255,255,255,.4)')
						.css('height','100%')
						.css('left',n.toFixed(2)+'%')
						.css('width',(this.buffered.end(e)*i-n).toFixed(2)+'%');
					}
				}else if(this.xtype=='mp4'){
					if(t.innerHTML==""){
						s=this.r938.xnew(t,'div')
						.css('position','absolute')
						.css('borderRadius','2px')
						.css('background','rgba(255,255,255,.4)')
						.css('height','100%')
						.css('left','0')
					}else s=t.q('div');
					s.css('width',(this.buffered.end(this.buffered.length-1)*100/this.r938.duration()).toFixed(2)+'%',1)
				}
			},
			volumechange:function(){
				this.r938.revolume()
			},
			ratechange:function(){
				this.r938.rerate()
			},
			ended:function(){
				this.r938.reend()
			},
			error:function(){
				this.r938.reerror()
			},
			play:function(){
				this.r938.replay()
			},
			pause:function(){
				this.r938.replay()
			},
			loadstart:function(){
				this.r938.reload()
			}
		},
		run:function(id){
			id.satb('webkit-playsinline','')
			.satb('playsinline','')
		}
	});
	
	i.create('bgTop','code','.bgTop');
	
	i.create('top','code','.top');
	i.create('name','top','.name');
	
	i.create('thumbnail','code','.thumbnail',{
		on:{
			click:function(){
				this.css('display','none',1);
				this.r938.id.video.plays()
			}
		}
	});
	i.create('image','thumbnail','.image');
	i.create('play','thumbnail','button.play',{
		run:function(id){
			id.newsvg('xplay')
		}
	});
	
	i.create('spinner','code','.spinner');
	i.create('spinIcon','spinner','.spinIcon').newsvg('xload');
	i.create('spinText','spinner','.spinText');
	
	i.create('menu','code','.menu',{css:{display:'none'}});
	
	i.create('bgBottom','code','.bgBottom');
	
	i.create('controls','code','.controls',{
		on:{
			click:function(){
				if(this.r938.mobile())
					this.r938.imenu(1)
			}
		}
	});
	i.create('timeBar','controls','.timeBar',{
		run:function(id){
			var bar=id.r938.slide(id,["rgba(255,255,255,.2)","","#ff0000"]);
			id.mybar=bar;
			bar.change=function(a){
				this.load(1,a);
				var vdo=this.r938.id.video;
				vdo.currentTime=this.r938.duration()*a/100
			}
		}
	});
	i.create('menuRow','controls','.menuRow');
	i.create('menuLeft','menuRow','.menuLeft');
	i.create('btPlay','menuLeft','button.icon',{
		on:{
			click:function(){
				this.r938.btplay()
			}
		},
		run:function(id){
			id.newsvg('play')
		}
	});
	i.create('boxvolume','menuLeft','.boxvolume');
	i.create('btVolume','boxvolume','button.icon',{
		on:{
			click:function(){
				this.r938.btmuted()
			}
		},
		run:function(id){
			id.newsvg('unmute')
		}
	});
	i.create('barVolume','boxvolume','.barVolume',{
		run:function(id){
			var bar=id.r938.slide(id,["rgba(255,255,255,.3)","#fff"],{
				t:"12.5px",
				h:"5px",
				s:"30px",
				p:"5px"
			});
			id.mybar=bar;
			bar.change=function(a){
				this.load(0,a);
				var vdo=this.r938.id.video;
				vdo.muted=0;
				vdo.volume=a/100
			}
		}
	});
	i.create('showTime','menuLeft','.showTime');
	i.create('current','showTime','.current',{
		run:function(id){
			id.html('00:00')
		}
	});
	i.create('separator','showTime','.separator',{
		run:function(id){
			id.html('/')
		}
	});
	i.create('duration','showTime','.duration',{
		run:function(id){
			id.html('00:00')
		}
	});
	
	i.create('menuRight','menuRow','.menuRight');
	i.create('btSetting','menuRight','button.icon',{
		on:{
			click:function(){
				this.r938.btmenu(this.r938.id.menu.style.display!='')
			}
		},
		run:function(id){
			id.newsvg('setting')
		}
	});
	i.create('btFullscreen','menuRight','button.icon',{
		on:{
			click:function(){
				this.r938.btscreen()
			}
		},
		run:function(id){
			id.newsvg('fullscreen')
		}
	});
	
	i.addMenu([
		['quality','คุณภาพ',''],
		['rate','ความเร็วในการเล่น',''],
		['rich','ทีมพัฒนา','PR938'],
	]);
	
	let rate=i.id.rateEvent;
	for(let x of [0.25,0.5,0.75,1,1.25,1.5,1.75,2]){
		let u=rate.add(x===1?'ปกติ':x,function(){
			let i=this.r938;
			i.id.video.playbackRate=this.rate
		});
		u.rate=x
	}
	
	let dev=i.id.richEvent.html().xnew('.dev');
	for(let x of [
		['WebSite',location.host],
		['Developer',i.info],
		['Version',i.version],
	])
		dev.xnew('.tDev').html(x[0]+'<span>'+x[1]+'</span>');
	
	i.upfull();
	i.interval=setInterval(i.update,100,i);
return i
}
