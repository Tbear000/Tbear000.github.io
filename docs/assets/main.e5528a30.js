import"./modulepreload-polyfill.b7f2da20.js";import{S as f,C as M,T as B,F as y,G,M as k,a as w,b as A,B as L,c as j,P,A as R,d as T,e as W,V as z,W as E,f as S,g as F}from"./vendor.b515687a.js";var D="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAilBMVEUAAAAGBgYREREKCgpcXFwZGRn9/f3///8fHx/e3t44ODg0NDQMDAxAQEAvLy/4+Pj09PTu7u7Ly8vHx8e8vLy5ubmtra2dnZ2YmJiQkJCNjY2Dg4OAgIB2dnZiYmJSUlJNTU0qKiojIyPm5uapqaloaGj19fXQ0NDl5eXg4OCrq6uIiIiGhoZpaWmzIz/uAAABbElEQVRIx9XW6W6DMAwA4DoHDSSBlvu+6d33f73RskrTVGlgaWjzH359SnAcx5s/FQBrQ6WQkBAk5BwJhUDCpkFCKZFQaySsayRkDAmHAQmLAqPGOs2yDaBgkmwQkoKKIgV08Y0iIPpejB9Y5KjixAoCi3BFYYkjwpbMdZm0BaGwwLVWVaammZaV1c6XQFrN8tjf7/04Z7olMHdBbrFb6JmOY3rhjVmcwrx8crvKw2O3M4xddwzzyuY/5xae0i5j73QwtlvjcPLi0h7djFKgXLLUN3fGCMc1TT9lktP3m6OEi0bqmg1FlkR94Jp7Z3SPMJy96QZ9lGTFwGotG8EJBfiE6gXvD3iZ4PYLvDzg/QXV+z8mwvq+VUvM6rBTcropOd2UnBkK6LvjoAAzC+AaemfHOXvhdSoAZMmhixx7rbAXGds6kM0K3x4RkWUYBc8nANZ9dBhb+2HVeu3hoWnWHpA4X3sIVOrfTMi/Ex+j/Rvis8xTeAAAAABJRU5ErkJggg==",V="/assets/Lobster_Regular.3f36dd1d.json",C="/assets/Inconsolata_Regular.ae291b7b.json";const h=document.querySelector("canvas.FirstCanvas"),o=new f;o.background=new M("#392f5a");const Q=new B,H=Q.load(D),m=new y;let d=null,l=null;const a=new G,g=new k;m.load(V,e=>{const n=new w("Theo Winters",{font:e,size:1.5,height:.2,curveSegments:10,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:5});n.center(),d=new A(n,g),d.position.set(0,0,-5),a.add(d)});m.load(C,e=>{const n=new w("Design",{font:e,size:.7,height:.1,curveSegments:12,bevelEnabled:!1});n.center(),l=new A(n,g),l.position.set(4,-1.5,-5),a.add(l)});o.add(a);const p=new L,u=5e3,v=new Float32Array(u*3);for(let e=0;e<u*3;e++)v[e]=(Math.random()-.5)*25;p.setAttribute("position",new j(v,3));const U=new P({size:.1,sizeAttenuation:!0,color:"#F4D06F",transparent:!0,alphaMap:H,depthWrite:!1,blending:R}),c=new T(p,U);o.add(c);const t={width:window.innerWidth,height:window.innerHeight,ratio:window.innerWidth/window.innerHeight};window.addEventListener("resize",()=>{t.width=window.innerWidth,t.height=window.innerHeight,t.ratio=window.innerWidth/window.innerHeight,i.aspect=t.width/t.height,i.updateProjectionMatrix(),s.setSize(t.width,t.height),s.setPixelRatio(Math.min(window.devicePixelRatio,2))});t.ratio<1?a.position.set(0,3,-5):a.position.set(4,2,0);const i=new W(75,t.width/t.height,.1,100);i.position.z=4;o.add(i);let x;window.addEventListener("deviceorientation",e=>{x=e.gamma/90,i.rotation.y=Math.PI/4*x},!0);const r=new S;h.addEventListener("mousemove",e=>{r.x=e.clientX/window.innerWidth*2-1,r.y=-(e.clientY/window.innerHeight)*2+1,i.position.x=r.x*2,i.position.y=r.y*6,i.lookAt(new z(0,0,0))});const s=new E({canvas:h});s.setSize(t.width,t.height);s.setPixelRatio(Math.min(window.devicePixelRatio,2));const Y=new F,b=()=>{const e=Y.getElapsedTime();c.rotation.x=e/60,c.rotation.y=e/75,s.render(o,i),window.requestAnimationFrame(b)};b();
