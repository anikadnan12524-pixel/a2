(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  function $(i){return document.getElementById(i);}
  // 1. Capsule builder
  var PAL={navy:[['#1F2E4A','Navy'],['#FFFFFF','White'],['#9AA0A6','Grey'],['#5F84B8','Chambray'],['#B5543C','Rust accent']],black:[['#1D1D1F','Black'],['#FFFFFF','White'],['#4A6A94','Denim'],['#C9C3B6','Stone'],['#B23A48','Red accent']],
    earth:[['#B8875A','Camel'],['#F3EBDD','Cream'],['#5E6B45','Olive'],['#6B4B3A','Chocolate'],['#D9A520','Mustard accent']],soft:[['#CFC7B8','Stone'],['#EFC7C2','Blush'],['#8FAAD0','Chambray'],['#FFFFFF','White'],['#7A8F7A','Sage accent']]};
  var SPLIT={25:[9,6,4,1,4,1],33:[12,8,5,2,5,1],40:[14,10,6,3,6,1]};
  var LIFE={office:{t:['Button-up shirts','Fine-knit sweaters','Plain crew-neck tees','A silk or satin blouse'],b:['Tailored trousers','Dark straight-leg jeans','A midi skirt or chinos'],l:['A tailored blazer','A wool coat','A cardigan'],s:['Leather loafers or flats','Clean white trainers','Ankle boots']},
    casual:{t:['Plain cotton tees','A striped Breton top','Relaxed sweatshirts','A linen shirt'],b:['Straight-leg jeans','Relaxed chinos','Comfortable joggers or shorts'],l:['A denim jacket','A cosy cardigan','A light rain jacket'],s:['White trainers','Canvas shoes','Comfortable sandals or boots']},
    mixed:{t:['Plain crew-neck tees','An oxford shirt','Fine-knit sweaters','A striped top'],b:['Dark jeans','Tailored trousers','Chinos or a midi skirt'],l:['An unstructured blazer','A cardigan','A trench or wool coat'],s:['White trainers','Loafers','Ankle boots']},
    active:{t:['Breathable tees','Long-sleeve layering tops','A zip fleece','A chambray shirt'],b:['Stretch jeans','Utility trousers','Leggings or track trousers'],l:['A packable rain jacket','A gilet','A warm parka'],s:['Supportive trainers','Weatherproof boots','Easy slip-ons']}};
  var cl=$('cb-l'),cw=$('cb-w'),cp=$('cb-p'),cn=$('cb-n');
  function capsule(){if(!cl)return;var N=+cn.value,s=SPLIT[N].slice(),L=LIFE[cl.value],w=cw.value,P=PAL[cp.value];
    if(w==='warm'){s[0]+=2;s[2]-=2;}if(w==='cool'){s[2]+=1;s[0]-=1;}
    $('cb-t').textContent='Your '+N+'-piece capsule';
    $('cb-sw').innerHTML=P.map(function(c){return '<i style="background:'+c[0]+'" title="'+c[1]+'"></i>';}).join('');
    var outfits=s[0]*s[1]+s[3]*2;
    $('cb-c').innerHTML=[['Tops',s[0]],['Bottoms',s[1]],['Layers',s[2]],['Dresses',s[3]],['Shoes',s[4]],['Bags',s[5]]].map(function(x){return '<div><b>'+x[1]+'</b><small>'+x[0]+'</small></div>';}).join('');
    var weather={warm:'Choose linen, cotton and lightweight layers.',four:'Plan a light layer for spring and autumn and a warm coat for winter.',cool:'Prioritise a waterproof coat, warm knits and boots that can handle rain.'}[w];
    $('cb-i').innerHTML=[['Tops',L.t],['Bottoms',L.b],['Layers',L.l],['Shoes',L.s]].map(function(g){return g[1].map(function(it,i){return '<li>'+(i===0?'<b>'+g[0]+'</b>':'')+it+'</li>';}).join('');}).join('');
    $('cb-o').innerHTML='<b>About '+outfits+' outfit combinations</b> from your tops and bottoms alone, in '+P.slice(0,3).map(function(c){return c[1].toLowerCase();}).join(', ')+' with a '+P[4][1].toLowerCase()+'. '+weather;}
  if(cl){[cl,cw,cp,cn].forEach(function(x){x.addEventListener('change',capsule);});capsule();}
  // 2. Care label decoder
  function sym(t,v){var S='<svg viewBox="0 0 42 36" aria-hidden="true" fill="none" stroke="#1D1D1F" stroke-width="2">',E='</svg>',X='<path d="M6 4 36 32M36 4 6 32" stroke="#B23A48" stroke-width="2.4"/>',dots=function(k,y,cx){var o='';for(var i=0;i<k;i++)o+='<circle cx="'+(cx-(k-1)*3.5+i*7)+'" cy="'+y+'" r="1.8" fill="#1D1D1F" stroke="none"/>';return o;};
    if(t==='wash'){var s=S+'<path d="M4 10l4 20h26l4-20"/><path d="M4 10c4 3 6 3 8 0 2 3 6 3 8 0 2 3 6 3 8 0 2 3 4 3 6 0"/>';if(v==='hand')s+='<path d="M15 24c2-6 5-6 6-2 1-4 4-4 6 2" stroke-width="1.6"/>';else s+=dots(v,22,21);return s+E;}
    if(t==='bleach'){var s2=S+'<path d="M21 4 38 32H4Z"/>';if(v==='no')s2+=X;if(v==='nonchlor')s2+='<path d="M17 28 25 12M22 28 30 14" stroke-width="1.6"/>';return s2+E;}
    if(t==='dry'){var s3=S+'<rect x="6" y="4" width="30" height="28"/>';if(v==='tumble')s3+='<circle cx="21" cy="18" r="9"/>'+dots(1,18,21);if(v==='line')s3+='<path d="M10 8c4 6 18 6 22 0"/>';if(v==='flat')s3+='<path d="M11 18h20"/>';return s3+E;}
    if(t==='iron'){var s4=S+'<path d="M5 28h32l-3-12c-1-4-4-6-8-6H14"/><path d="M5 28c0-6 4-10 10-10h20"/>';if(v===0)s4+=X;else s4+=dots(v,24,22);return s4+E;}
    if(t==='dc'){var s5=S+'<circle cx="21" cy="18" r="13"/>';if(v==='no')s5+=X;else s5+='<text x="21" y="23" text-anchor="middle" font-size="14" font-family="sans-serif" fill="#1D1D1F" stroke="none">P</text>';return s5+E;}}
  var FB={cotton:{n:'Cotton',w:[2,'Machine wash up to 40°C (104°F)'],bl:['nonchlor','Non-chlorine bleach only, on whites'],d:['tumble','Tumble dry low, or line dry to save energy and shrinkage'],i:[3,'Hot iron, best while slightly damp'],dc:['ok','Dry cleaning not usually needed'],note:'Wash dark cotton inside out to keep the colour rich, and expect a little shrinkage the first time if it isn’t pre-shrunk.'},
    linen:{n:'Linen',w:[2,'Machine wash at 30–40°C (86–104°F) on a gentle cycle'],bl:['no','Avoid bleach; it weakens the fibres'],d:['line','Line dry; skip the tumble dryer'],i:[3,'Hot iron while still damp, or embrace the creases'],dc:['ok','Can be dry cleaned'],note:'Linen softens beautifully with every wash. Shake it out and hang it straight away to reduce creasing.'},
    denim:{n:'Denim',w:[1,'Machine wash cold to 30°C (86°F), inside out'],bl:['no','No bleach'],d:['line','Line dry to protect colour and fit'],i:[2,'Medium iron, inside out, if needed'],dc:['ok','Dry cleaning not needed'],note:'Wash jeans only when they need it. Air them between wears and spot-clean small marks to keep the colour deep.'},
    wool:{n:'Wool',w:['hand','Hand wash or wool cycle at 30°C (86°F) with wool detergent'],bl:['no','No bleach'],d:['flat','Dry flat, reshaped, away from direct heat'],i:[1,'Cool iron with a pressing cloth, or steam'],dc:['ok','Dry cleaning is fine for tailored wool'],note:'Wool resists odours, so it rarely needs washing. Brush coats and air knits between wears, and never wring.'},
    cashmere:{n:'Cashmere',w:['hand','Hand wash in cool water with a gentle wool wash'],bl:['no','No bleach'],d:['flat','Roll in a towel to remove water, then dry flat'],i:[1,'Steam rather than iron'],dc:['ok','Dry cleaning is an option'],note:'Fold, never hang. Remove pills gently with a cashmere comb and store with cedar to deter moths.'},
    silk:{n:'Silk',w:['hand','Hand wash in cool water with a silk or wool detergent'],bl:['no','No bleach'],d:['line','Dry flat or hang in the shade, never in direct sun'],i:[1,'Cool iron on the reverse side'],dc:['ok','Dry clean structured or printed silk'],note:'Don’t wring or twist silk. Press out water with a towel and keep it away from perfume and deodorant.'},
    viscose:{n:'Viscose (rayon)',w:['hand','Hand wash or delicate cycle at 30°C (86°F)'],bl:['no','No bleach'],d:['line','Line dry; viscose can shrink in the dryer'],i:[2,'Medium iron, inside out'],dc:['ok','Dry clean if the label says so'],note:'Viscose is weak when wet, so handle it gently and reshape while damp.'},
    poly:{n:'Polyester and nylon',w:[2,'Machine wash at 30–40°C (86–104°F)'],bl:['nonchlor','Non-chlorine bleach only'],d:['tumble','Tumble dry low or line dry; dries quickly'],i:[1,'Cool iron only; high heat can melt fibres'],dc:['ok','Dry cleaning not usually needed'],note:'Synthetics can hold odours. Wash activewear soon after wearing, skip fabric softener and use a microfibre-catching bag if you have one.'}};
  var cf=$('cl-f');
  function care(){if(!cf)return;var F=FB[cf.value];$('cl-t').textContent=F.n;
    var lbl={wash:'Wash',bleach:'Bleach',dry:'Dry',iron:'Iron',dc:'Dry clean'};
    $('cl-s').innerHTML=[['wash',F.w[0]],['bleach',F.bl[0]],['dry',F.d[0]],['iron',F.i[0]],['dc',F.dc[0]]].map(function(x){return '<div>'+sym(x[0],x[1])+lbl[x[0]]+'</div>';}).join('');
    $('cl-l').innerHTML=[['Wash',F.w[1]],['Bleach',F.bl[1]],['Dry',F.d[1]],['Iron',F.i[1]],['Professional',F.dc[1]]].map(function(x){return '<li><b>'+x[0]+'</b><span>'+x[1]+'</span></li>';}).join('');
    $('cl-n').innerHTML='<b>Good to know:</b> '+F.note;}
  if(cf){cf.addEventListener('change',care);care();}
  // 3. Outfit formula
  var OF={work:{f:['Crisp shirt or fine knit','Tailored trousers','Loafers'],c:'Keep to two neutrals plus one colour near your face.',s:['Swap trousers for a midi skirt and ankle boots','Trade the shirt for a plain tee under a blazer','Add a slim belt to sharpen the line']},
    weekend:{f:['Soft tee or sweatshirt','Straight-leg jeans','White trainers'],c:'Mix textures: knit, denim and cotton keep simple colours interesting.',s:['Add a striped top for a classic look','Swap jeans for relaxed chinos','Throw on an overshirt as a light layer']},
    dinner:{f:['Silky top or fine knit','Dark jeans or a slip skirt','Ankle boots or smart flats'],c:'One statement piece is plenty; let everything else stay simple.',s:['Swap the top for an easy dress','Add a blazer over the shoulders','Change trainers for loafers to dress it up']},
    travel:{f:['Breathable tee','Stretch trousers or joggers','Slip-on trainers'],c:'Wear your bulkiest layers and shoes on the journey to save space.',s:['Carry a scarf that doubles as a blanket','Choose dark colours that hide marks','Pack layers rather than heavy single pieces']},
    event:{f:['Tailored blazer or dress','Matching trousers or a midi skirt','Polished shoes'],c:'Tonal outfits (shades of one colour) look elegant and effortless.',s:['Try a suit worn with a fine knit instead of a shirt','Add one piece of jewellery or a pocket square','Check the dress code and go one step smarter if unsure']}};
  var WX={hot:['Light, breathable fabrics such as linen and cotton','Choose loose fits and lighter colours; swap closed shoes for sandals where appropriate.'],mild:['A light layer you can take off','A cardigan, overshirt or unlined jacket covers changing temperatures.'],cold:['A warm coat and knit layer','Add a thermal base layer, a scarf and boots; wool keeps you warm even when damp.'],wet:['A waterproof jacket','Choose water-resistant shoes and avoid long hems that soak up puddles.']};
  var oo=$('of-o'),ow=$('of-w');
  function outfit(){if(!oo)return;var O=OF[oo.value],W=WX[ow.value];
    $('of-t').textContent='Formula: '+oo.options[oo.selectedIndex].text+', '+ow.options[ow.selectedIndex].text.toLowerCase();
    $('of-f').innerHTML=O.f.concat([W[0]]).map(function(x){return '<span>'+x+'</span>';}).join('<em>+</em>');
    $('of-c').innerHTML='<b>Colour tip:</b> '+O.c;
    $('of-s').innerHTML=O.s.map(function(x,i){return '<li>'+(i===0?'<b>Switch it up</b>':'')+x+'</li>';}).join('');
    $('of-n').innerHTML='<b>Weather note:</b> '+W[1];}
  if(oo){[oo,ow].forEach(function(x){x.addEventListener('change',outfit);});outfit();}
  // contact
  var fm=$('cform');
  if(fm)fm.addEventListener('submit',function(ev){ev.preventDefault();if(fm.website.value)return;
    if(!fm.checkValidity()){fm.reportValidity();return;}
    var body='Name: '+fm.name.value+'\nEmail: '+fm.email.value+'\nTopic: '+fm.topic.value+'\n\n'+fm.message.value;
    window.location.href='mailto:'+fm.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+fm.topic.value)+'&body='+encodeURIComponent(body);
    var s=$('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+fm.dataset.to+'.';});
  var c=$('cookie'),v=null;try{v=localStorage.getItem('ea_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('ea_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();
