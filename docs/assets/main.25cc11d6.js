import"./style.7f2dd081.js";import{S as u,C as v,T as E,F as W,G as F,M as D,a as f,b as l,B as C,c as H,P as V,A as Q,d as K,e as x,V as O,W as M,f as U,g as b,h as Y,i as y,j as Z}from"./vendor.fcee6200.js";import{i as X}from"./Inconsolata_Regular.e59c2e0b.js";var J="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAilBMVEUAAAAGBgYREREKCgpcXFwZGRn9/f3///8fHx/e3t44ODg0NDQMDAxAQEAvLy/4+Pj09PTu7u7Ly8vHx8e8vLy5ubmtra2dnZ2YmJiQkJCNjY2Dg4OAgIB2dnZiYmJSUlJNTU0qKiojIyPm5uapqaloaGj19fXQ0NDl5eXg4OCrq6uIiIiGhoZpaWmzIz/uAAABbElEQVRIx9XW6W6DMAwA4DoHDSSBlvu+6d33f73RskrTVGlgaWjzH359SnAcx5s/FQBrQ6WQkBAk5BwJhUDCpkFCKZFQaySsayRkDAmHAQmLAqPGOs2yDaBgkmwQkoKKIgV08Y0iIPpejB9Y5KjixAoCi3BFYYkjwpbMdZm0BaGwwLVWVaammZaV1c6XQFrN8tjf7/04Z7olMHdBbrFb6JmOY3rhjVmcwrx8crvKw2O3M4xddwzzyuY/5xae0i5j73QwtlvjcPLi0h7djFKgXLLUN3fGCMc1TT9lktP3m6OEi0bqmg1FlkR94Jp7Z3SPMJy96QZ9lGTFwGotG8EJBfiE6gXvD3iZ4PYLvDzg/QXV+z8mwvq+VUvM6rBTcropOd2UnBkK6LvjoAAzC+AaemfHOXvhdSoAZMmhixx7rbAXGds6kM0K3x4RkWUYBc8nANZ9dBhb+2HVeu3hoWnWHpA4X3sIVOrfTMi/Ex+j/Rvis8xTeAAAAABJRU5ErkJggg==",q="/assets/Lobster_Regular.3f36dd1d.json";const P=document.querySelector("canvas.FirstCanvas"),a=new u;a.background=new v("#392f5a");const I=new E,N=I.load(J),k=new W;let m=null,g=null;const s=new F,B=new D;k.load(q,e=>{const i=new f("Theo Winters",{font:e,size:1.5,height:.2,curveSegments:10,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:5});i.center(),m=new l(i,B),m.position.set(0,0,-5),s.add(m)});k.load(X,e=>{const i=new f("Design",{font:e,size:.7,height:.1,curveSegments:12,bevelEnabled:!1});i.center(),g=new l(i,B),g.position.set(4,-1.5,-5),s.add(g)});a.add(s);const L=new C,R=5e3,z=new Float32Array(R*3);for(let e=0;e<R*3;e++)z[e]=(Math.random()-.5)*25;L.setAttribute("position",new H(z,3));const $=new V({size:.1,sizeAttenuation:!0,color:"#F4D06F",transparent:!0,alphaMap:N,depthWrite:!1,blending:Q}),A=new K(L,$);a.add(A);const t={width:window.innerWidth,height:window.innerHeight,ratio:window.innerWidth/window.innerHeight};window.addEventListener("resize",()=>{t.width=window.innerWidth,t.height=window.innerHeight,t.ratio=window.innerWidth/window.innerHeight,o.aspect=t.width/t.height,o.updateProjectionMatrix(),r.setSize(t.width,t.height),r.setPixelRatio(Math.min(window.devicePixelRatio,2))});t.ratio<1?s.position.set(0,3,-5):s.position.set(4,2,0);const o=new x(75,t.width/t.height,.1,100);o.position.z=4;a.add(o);if(window.DeviceOrientationEvent){let e;window.addEventListener("deviceorientation",i=>{e=i.gamma,o.rotation.y=e},!0)}else{const e=new U;P.addEventListener("mousemove",i=>{e.x=i.clientX/window.innerWidth*2-1,e.y=-(i.clientY/window.innerHeight)*2+1,o.position.x=e.x*2,o.position.y=e.y*6,o.lookAt(new O(0,0,0))})}const r=new M({canvas:P});r.setSize(t.width,t.height);r.setPixelRatio(Math.min(window.devicePixelRatio,2));const _=new b,G=()=>{const e=_.getElapsedTime();A.rotation.x=e/60,A.rotation.y=e/75,r.render(a,o),window.requestAnimationFrame(G)};G();const ee=document.querySelector("canvas.SecondCanvas"),d=new u;d.background=new v(3487029);const T=new Y(1,.4,64,8),te=new y({color:16776960}),p=new l(T,te),ie=new y({color:16711935}),h=new l(T,ie);h.position.set(-5,3,-3);d.add(p,h);const j=new Z(16777215,1,50);j.position.set(0,0,5);d.add(j);const n={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,c.aspect=n.width/n.height,c.updateProjectionMatrix(),w.setSize(n.width,n.height),w.setPixelRatio(Math.min(window.devicePixelRatio,2))});const c=new x(75,n.width/n.height,.1,100);c.position.set(1,1,5);d.add(c);const w=new M({canvas:ee});w.setSize(n.width,n.height);w.setPixelRatio(Math.min(window.devicePixelRatio,2));const ne=new b,S=()=>{const e=ne.getElapsedTime();p.rotation.y=e/2.34,p.rotation.x=e/4.2,h.rotation.x=-e/1.53,h.rotation.z=e/5.23,w.render(d,c),window.requestAnimationFrame(S)};S();