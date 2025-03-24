import{g as pn,a as xn,r,u as fn,_ as yn,b as D,j as n,s as z,e as vn,v as O,f as kn,w as sn,x as rn,c as _,h as bn,B as K,A as Cn,T as jn,I as G,y as In,i as b,C as Sn,G as w,P as J,o as Tn,n as wn,z as P,S as X,E as Q,D as Pn,F as Dn,k as Nn,J as Mn,K as Rn}from"./index-garbTk3y.js";function Bn(t){return pn("MuiCircularProgress",t)}xn("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Kn=["className","color","disableShrink","size","style","thickness","value","variant"];let $=t=>t,Y,Z,nn,tn;const u=44,Gn=rn(Y||(Y=$`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),On=rn(Z||(Z=$`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),$n=t=>{const{classes:e,variant:o,color:c,disableShrink:C}=t,d={root:["root",o,`color${O(c)}`],svg:["svg"],circle:["circle",`circle${O(o)}`,C&&"circleDisableShrink"]};return kn(d,Bn,e)},qn=z("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[o.variant],e[`color${O(o.color)}`]]}})(({ownerState:t,theme:e})=>D({display:"inline-block"},t.variant==="determinate"&&{transition:e.transitions.create("transform")},t.color!=="inherit"&&{color:(e.vars||e).palette[t.color].main}),({ownerState:t})=>t.variant==="indeterminate"&&sn(nn||(nn=$`
      animation: ${0} 1.4s linear infinite;
    `),Gn)),An=z("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,e)=>e.svg})({display:"block"}),Hn=z("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.circle,e[`circle${O(o.variant)}`],o.disableShrink&&e.circleDisableShrink]}})(({ownerState:t,theme:e})=>D({stroke:"currentColor"},t.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},t.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:t})=>t.variant==="indeterminate"&&!t.disableShrink&&sn(tn||(tn=$`
      animation: ${0} 1.4s ease-in-out infinite;
    `),On)),zn=r.forwardRef(function(e,o){const c=fn({props:e,name:"MuiCircularProgress"}),{className:C,color:d="primary",disableShrink:E=!1,size:p=40,style:F,thickness:f=3.6,value:y=0,variant:j="indeterminate"}=c,v=yn(c,Kn),x=D({},c,{color:d,disableShrink:E,size:p,thickness:f,value:y,variant:j}),l=$n(x),I={},S={},N={};if(j==="determinate"){const k=2*Math.PI*((u-f)/2);I.strokeDasharray=k.toFixed(3),N["aria-valuenow"]=Math.round(y),I.strokeDashoffset=`${((100-y)/100*k).toFixed(3)}px`,S.transform="rotate(-90deg)"}return n.jsx(qn,D({className:vn(l.root,C),style:D({width:p,height:p},S,F),ownerState:x,ref:o,role:"progressbar"},N,v,{children:n.jsx(An,{className:l.svg,ownerState:x,viewBox:`${u/2} ${u/2} ${u} ${u}`,children:n.jsx(Hn,{className:l.circle,style:I,ownerState:x,cx:u,cy:u,r:(u-f)/2,fill:"none",strokeWidth:f})})}))}),_n=_(n.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),En=_(n.jsx("path",{d:"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5"}),"Link"),en=_(n.jsx("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"}),"Refresh"),an="AIzaSyAQYbMv776R52W-qz-80ywInejsHkxNUIU",Vn=()=>{const t=bn(),[e,o]=r.useState(null),[c,C]=r.useState(null),[d,E]=r.useState(null),[p,F]=r.useState(null),[f,y]=r.useState([]),[j,v]=r.useState(!1),[x,l]=r.useState(null),[I,S]=r.useState(!1),[N,k]=r.useState(!1),[cn,on]=r.useState(""),[q,M]=r.useState(0),[L,R]=r.useState(!1);r.useEffect(()=>{const a=localStorage.getItem("croppedClothImage");o(a);const s=localStorage.getItem("savedModels"),i=localStorage.getItem("selectedModelId");if(s&&i){const g=JSON.parse(s).find(h=>h.id===i);g&&C(g.image)}},[]),r.useEffect(()=>{let a;return q>0&&(a=setInterval(()=>{M(s=>s<=1?(R(!1),clearInterval(a),0):s-1)},1e3)),()=>{a&&clearInterval(a)}},[q]);const hn=async()=>{y([]),v(!0),R(!0),M(75);try{if(!e||!c)throw new Error("Thiếu ảnh trang phục hoặc người mẫu");const a=e,s=[B(a,c),B(a,c),B(a,c),B(a,c)];(await Promise.all(s)).some(g=>g)||(l("Không thể tạo ảnh thử đồ. Vui lòng thử lại sau."),v(!1),R(!1),M(0))}catch(a){console.error("Lỗi khi gọi Gemini API:",a),R(!1),M(0),l("Không thể tạo ảnh thử đồ. Vui lòng thử lại sau.")}},ln=()=>{t("/clothes/crop")},U=()=>{l(null)},B=async(a,s)=>{if(!a||!s)return l("Vui lòng xóa phông cả trang phục và người mẫu trước"),!1;v(!0),l(null);try{const i=await V(a),m=await V(s);let h=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${an}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:`
Hãy tự phát hiện và gán hai hình ảnh như sau:

Ảnh 1: Trang phục
Đặc điểm: Bức ảnh không có người, chỉ có trang phục hoặc có người mặc nhưng không hiển thị đủ đầu, tay, chân của người mặc. Trang phục có thể được đặt trên một bề mặt phẳng (như bàn, sàn) hoặc treo trên mắc áo.
Cách nhận biết: Tìm bức ảnh không có người mẫu xuất hiện hoàn chỉnh. Nếu chỉ thấy quần áo mà không có ai mặc hoặc có người mặc nhưng không hiển thị đủ đầu, tay, chân, đó chính là ảnh trang phục.
Ảnh 2: Người mẫu
Đặc điểm: Bức ảnh có người mẫu hiển thị đủ đầu, tay, chân, nhưng người mẫu không mặc trang phục giống với trang phục trong ảnh trang phục. Người mẫu có thể mặc trang phục khác (như đồ lót, trang phục nền) hoặc không mặc gì (tùy ngữ cảnh, thường là trang phục tối giản trong ứng dụng thử đồ ảo).
Cách nhận biết: Sau khi xác định ảnh trang phục, trong hai bức ảnh còn lại, tìm bức ảnh có người mẫu nhưng trang phục trên người mẫu khác với trang phục trong ảnh trang phục. Đó là ảnh người mẫu.
Mô tả các bước ghép trang phục từ ảnh 2 vào người mẫu của ảnh 1:

Bước 1: Xác định vị trí và kích thước của người mẫu trong ảnh 1.
Bước 2: Cắt trang phục từ ảnh 2.
Bước 3: Điều chỉnh kích thước và vị trí của trang phục sao cho phù hợp với người mẫu trong ảnh 1.
Bước 4: Ghép trang phục đã cắt vào người mẫu trong ảnh 1.
Bước 5: Điều chỉnh màu sắc và ánh sáng của trang phục để hòa hợp tự nhiên với ảnh 1.
Tạo ảnh dựa trên mô tả:

Thực hiện các bước ghép ảnh theo hướng dẫn trên để tạo ra một bức ảnh mới, trong đó người mẫu trong ảnh 1 mặc trang phục từ ảnh 2.
`},{inlineData:{mimeType:"image/png",data:i}},{inlineData:{mimeType:"image/png",data:m}}]}],generationConfig:{temperature:.1,topK:10,topP:.9,maxOutputTokens:1e4,responseModalities:["Text","Image"]}})}),T=await h.json();const W=T.candidates[0].content.parts.find(H=>H.inlineData).inlineData.data,dn=`data:image/png;base64,${W}`;return h=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${an}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:`
Hãy tự động gán nhãn cho ba hình ảnh theo các vai trò sau: Ảnh Trang phục, Ảnh Người mẫu, và Ảnh Kết quả.

Mô tả các loại ảnh
Ảnh Trang phục
Đặc điểm: Bức ảnh chỉ có trang phục, không có người mẫu hoàn chỉnh (hoặc có người nhưng không hiển thị đủ đầu, tay, chân). Trang phục có thể được đặt trên bề mặt phẳng (như bàn, sàn) hoặc treo trên mắc áo.
Cách nhận biết: Tìm bức ảnh không có người mẫu đầy đủ. Nếu chỉ thấy quần áo hoặc người mặc thiếu các bộ phận cơ thể (đầu, tay, chân), đó là Ảnh Trang phục.
Ảnh Người mẫu
Đặc điểm: Bức ảnh có người mẫu hiển thị đầy đủ đầu, tay, chân, nhưng không mặc trang phục giống với Ảnh Trang phục. Người mẫu có thể mặc trang phục khác (như đồ lót, trang phục nền) hoặc trang phục tối giản (tùy ngữ cảnh).
Cách nhận biết: Trong hai bức ảnh có người mẫu đầy đủ, ảnh nào có trang phục khác với Ảnh Trang phục, đó là Ảnh Người mẫu.
Ảnh Kết quả
Đặc điểm: Bức ảnh có người mẫu mặc trang phục giống hệt với Ảnh Trang phục, và trang phục được ghép vào bằng chỉnh sửa ảnh.
Cách nhận biết: Trong hai bức ảnh có người mẫu đầy đủ, ảnh nào có trang phục trùng khớp với Ảnh Trang phục, đó là Ảnh Kết quả. (Nếu cần, có thể kiểm tra dấu hiệu chỉnh sửa như viền không tự nhiên hoặc ánh sáng không đồng đều, nhưng không bắt buộc nếu trang phục đã rõ ràng giống nhau).
Quy trình gán nhãn
Bước 1: Xác định bức ảnh không có người mẫu hoàn chỉnh (hoặc thiếu đầu, tay, chân) – đó là Ảnh Trang phục.
Bước 2: Với hai bức ảnh còn lại (có người mẫu đầy đủ), so sánh trang phục:
Nếu trang phục khác với Ảnh Trang phục, đó là Ảnh Người mẫu.
Nếu trang phục giống với Ảnh Trang phục, đó là Ảnh Kết quả.
Kết quả gán nhãn: Xác định rõ vai trò của từng ảnh theo thứ tự: Ảnh 1 là Trang phục, Ảnh 2 là Người mẫu, Ảnh 3 là Kết quả.
Đánh giá Ảnh Kết quả
Sau khi gán nhãn, hãy kiểm tra xem Ảnh Kết quả có thỏa mãn tất cả các điều kiện sau không:

Người trong Ảnh Kết quả có mặc trang phục giống y hệt với Ảnh Trang phục hay không.
Người trong Ảnh Kết quả có phải là cùng một người với người trong Ảnh Người mẫu hay không.
Trang phục trong Ảnh Kết quả có được mặc một cách tự nhiên và hài hòa hay không (không có dấu hiệu ghép ảnh quá lộ liễu).
Trả lời:
"Đúng" nếu tất cả ba điều kiện đều được thỏa mãn.
"Sai" nếu bất kỳ điều kiện nào không được thỏa mãn.`},{inlineData:{mimeType:"image/png",data:i}},{inlineData:{mimeType:"image/png",data:m}},{inlineData:{mimeType:"image/png",data:W}}]}],generationConfig:{temperature:.1,topK:10,topP:.9,maxOutputTokens:1e4,responseModalities:["Text","Image"]}})}),T=await h.json(),T.candidates[0].content.parts[0].text.includes("Đúng")?(y(H=>[...H,dn]),S(!0),v(!1),!0):!1}catch(i){return console.error("Lỗi gọi Gemini API:",i),!1}},V=async a=>{const i=await(await fetch(a)).blob();return new Promise((m,g)=>{const h=new FileReader;h.onloadend=()=>{const T=h.result.split(",")[1];m(T)},h.onerror=g,h.readAsDataURL(i)})},gn=a=>{const s=localStorage.getItem("tryOnHistory"),i=s?JSON.parse(s):[],m={id:`tryOn_${Date.now()}`,clothImage:d||"",modelImage:p||"",generatedImage:a,timestamp:Date.now()};i.unshift(m);const g=i.slice(0,20);localStorage.setItem("tryOnHistory",JSON.stringify(g)),k(!0),on("Ảnh đã được lưu vào lịch sử thử đồ")},A=()=>{S(!1)},mn=()=>{t("/clothes")},un=()=>{t("/models")};return n.jsxs(K,{sx:{display:"flex",flexDirection:"column",height:"100vh",bgcolor:"#f5f5f7"},children:[n.jsx(Cn,{position:"static",elevation:0,sx:{bgcolor:"white",color:"text.primary"},children:n.jsxs(jn,{sx:{minHeight:{xs:"56px"}},children:[n.jsx(G,{edge:"start",color:"inherit","aria-label":"back",sx:{mr:2},onClick:ln,children:n.jsx(In,{})}),n.jsx(b,{variant:"h6",component:"div",sx:{flexGrow:1,fontWeight:600,fontSize:{xs:"1.1rem",sm:"1.25rem"}},children:"Xem trước thử đồ"})]})}),n.jsxs(Sn,{sx:{flexGrow:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",py:3},children:[n.jsxs(w,{container:!0,spacing:2,sx:{maxWidth:600,width:"100%"},children:[n.jsx(w,{item:!0,xs:6,children:n.jsxs(J,{elevation:3,sx:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",p:2,borderRadius:3},children:[n.jsxs(b,{variant:"subtitle1",sx:{mb:2,display:"flex",alignItems:"center"},children:[n.jsx(Tn,{sx:{mr:1}})," Trang phục"]}),d?n.jsx("img",{src:d,alt:"Processed cloth",style:{width:"100%",aspectRatio:"1/1",objectFit:"cover",borderRadius:16}}):e?n.jsx("img",{src:e,alt:"Cropped cloth",style:{width:"100%",aspectRatio:"1/1",objectFit:"cover",borderRadius:16}}):n.jsx(b,{color:"text.secondary",children:"Chưa có ảnh"}),n.jsx(G,{color:"inherit","aria-label":"change clothes",onClick:mn,children:n.jsx(en,{})})]})}),n.jsx(w,{item:!0,xs:6,children:n.jsxs(J,{elevation:3,sx:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",p:2,borderRadius:3},children:[n.jsxs(b,{variant:"subtitle1",sx:{mb:2,display:"flex",alignItems:"center"},children:[n.jsx(wn,{sx:{mr:1}})," Người mẫu"]}),p?n.jsx("img",{src:p,alt:"Processed model",style:{width:"100%",aspectRatio:"1/1",objectFit:"cover",borderRadius:16}}):c?n.jsx("img",{src:c,alt:"Selected model",style:{width:"100%",aspectRatio:"1/1",objectFit:"cover",borderRadius:16}}):n.jsx(b,{color:"text.secondary",children:"Chưa chọn người mẫu"}),n.jsx(G,{color:"inherit","aria-label":"change clothes",onClick:un,children:n.jsx(en,{})})]})})]}),j&&n.jsxs(K,{sx:{position:"fixed",top:0,left:0,width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)",zIndex:9999},children:[n.jsx(zn,{}),n.jsx(b,{variant:"h6",sx:{color:"white",mt:2},children:"Đang mặc thử đồ..."})]}),n.jsxs(K,{display:"flex",justifyContent:"space-between",mt:2,children:[n.jsx(P,{variant:"outlined",onClick:()=>t("/"),children:"Trang chủ"}),n.jsx(P,{variant:"contained",color:"primary",onClick:hn,disabled:j||L,sx:{ml:2},children:L?`Thử đồ (${q}s)`:"Thử đồ"})]}),n.jsx(X,{open:!!x,autoHideDuration:6e3,onClose:U,children:n.jsx(Q,{onClose:U,severity:"error",sx:{width:"100%"},children:x})})]}),n.jsxs(Pn,{open:I,onClose:A,maxWidth:"md",fullWidth:!0,children:[n.jsxs(Dn,{children:["Đã thử đồ xong ^^",n.jsx(G,{"aria-label":"close",onClick:A,sx:{position:"absolute",right:8,top:8},children:n.jsx(_n,{})})]}),n.jsx(Nn,{children:n.jsx(w,{container:!0,spacing:2,children:f.map((a,s)=>n.jsxs(w,{item:!0,xs:12,sm:6,children:[n.jsx("img",{src:a,alt:`AI Generated ${s+1}`,style:{width:"100%",height:"auto",objectFit:"contain",borderRadius:"8px"}}),n.jsxs(K,{sx:{mt:1,display:"flex",justifyContent:"center",gap:1},children:[n.jsx(P,{startIcon:n.jsx(En,{}),size:"small",children:"Chia sẻ"}),n.jsx(P,{startIcon:n.jsx(Mn,{}),onClick:()=>gn(a),size:"small",children:"Lưu"})]})]},s))})}),n.jsx(Rn,{children:n.jsx(P,{onClick:A,children:"Đóng"})})]}),n.jsx(X,{open:N,autoHideDuration:6e3,onClose:()=>k(!1),children:n.jsx(Q,{onClose:()=>k(!1),severity:"success",sx:{width:"100%"},children:cn})})]})};export{Vn as default};
