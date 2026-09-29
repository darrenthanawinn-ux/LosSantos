const $=id=>document.getElementById(id),R=a=>a[Math.random()*a.length|0],rnd=(a,b)=>a+(Math.random()*(b-a+1)|0);
const ZONES={
"Little Seoul":{s:"D-4 · Central LS",n:["Vendors haggle over kimchi fries.","Neon Hangul flickers over a karaoke bar.","A courier weaves through gridlocked traffic."]},
"Vinewood":{s:"C-3 · North LS",n:["Tourists photograph the sidewalk stars.","A street performer in a bad Impotent Rage costume argues with a cop.","Billboards scream about a new reality show."]},
"Downtown":{s:"D-3 · Central LS",n:["Suits stream out of glass towers.","A helicopter thumps between skyscrapers.","A Maze Bank sign glares across the skyline."]},
"Rockford Hills":{s:"C-4 · West LS",n:["Joggers in matching spandex ignore you.","Boutique doors chime with money.","A Ferrari-grade attitude idles at a crosswalk."]},
"Vespucci Beach":{s:"B-5 · Coast",n:["Skaters clatter along the boardwalk.","Muscle Beach grunts carry over the sand.","Gulls fight over a dropped hot dog."]},
"Davis":{s:"E-5 · South LS",n:["Low-riders bounce past a corner store.","Someone eyes your hoodie, then your shoes.","Distant sirens go unanswered."]},
"Mirror Park":{s:"E-3 · East LS",n:["Hipsters sip cold brew by the lake.","A fixie rider cuts across your path.","Indie guitar leaks from an open window."]},
"Strawberry":{s:"E-4 · South LS",n:["A dealer pretends to check his phone.","Graffiti glows in the low sun.","A tow truck hauls away a smoking sedan."]},
"Route 68":{s:"B-2 · Blaine Hwy",n:["Heat shimmers off empty asphalt.","A trucker leans on his horn.","Tumbleweeds and a roadside shrine."]},
"Sandy Shores":{s:"G-2 · Grand Senora",n:["A meth-thin local mutters at a gas pump.","Dust devils circle a burned-out trailer.","A biker bar hums with bad ideas."]},
"Grapeseed":{s:"H-1 · Blaine County",n:["Farmers glare at city plates.","Chickens scatter under your tires.","A sheriff naps behind the wheel."]},
"Paleto Bay":{s:"H-0 · Far North",n:["Sea fog rolls over the sawmill.","A lone deputy sips coffee at the bank.","Quiet. Too quiet for a town this rich in cash."]},
"Mount Chiliad":{s:"G-0 · Summit",n:["Wind whips at the cable car station.","Paragliders drift like bright insects.","The whole county sprawls below."]}};
const GUNS={Pistol:{p:400,m:12,mag:"9mm",noise:"loud",rec:"low"},"Micro SMG":{p:2000,m:16,mag:"9mm",noise:"loud",rec:"high"},"Pump Shotgun":{p:1600,m:8,mag:"12ga",noise:"very loud",rec:"heavy"},Knife:{p:50,m:0,mag:"—",noise:"silent",rec:"n/a"}};
const CARS=["Karin Asterope","Declasse Premier","Vapid Stanier","Bravado Buffalo","Ubermacht Oracle"];
const RADIO={"West Coast Classics":["Dre Dre-esque: 'Still Cruisin''","Ad: Sue Murry's Cadaver Beauty Salon"],"Radio Mirror Park":["Indie synth: 'Neon Lakes'","Ad: Craft Kale Distillery"],"Non-Stop Pop":["Pop banger: 'Rapture Me Tonight'","Ad: Prop 5 – Ban Sunscreen"],"Channel X":["Punk blast: 'Riot in the Alley'","Ad: Squeeler Whistleblower Hotline"],"FlyLo FM":["Beat scene: 'Cloud Drift Loop'","Ad: LifeInvader – Share Your Soul"]};
const STARS={1:"Patrol cars pursue, lights flashing, verbal warnings.",2:"Cruisers converge, PIT maneuvers, combat pistols.",3:"LSPD tactical units, shotguns, road-ramming. Air support requested.",4:"NOOSE vans, heavy armor, Buzzard gunship locking on.",5:"Total lethal override. Rhinos, snipers, FIB. Good luck."};
const fresh=()=>({zone:"Little Seoul",veh:null,cash:450,bank:0,hp:100,ar:0,w:0,inv:["Matches","Burner phone"],gun:null,ammo:0,radio:null,tr:0,t:16.25,heat:0,drug:0,log:[],turn:0,ammu:false,seen:0});
let S=fresh();
const bar=(v,c)=>c.repeat(Math.round(v/10))+"░".repeat(10-Math.round(v/10));
const clock=()=>{let h=Math.floor(S.t)%24,m=Math.round((S.t%1)*60);return`${((h+11)%12)+1}:${String(m).padStart(2,"0")} ${h<12?"AM":"PM"}`};
function hud(){const z=ZONES[S.zone],v=S.veh?`${S.veh.n} / Engine ${S.veh.on?"ON":"OFF"} / Condition: ${S.veh.hp}%`:"Walking";
const l=S.gun?`${S.gun} ${S.ammo} rds`:"Unarmed";const r=S.radio?`${S.radio} - ${RADIO[S.radio][S.tr%2]}`:"Off";
const rows=[["📍 ZONE",`${S.zone} | ${clock()}`],["🚗 VEHICLE",v],["💰 CASH",`$${S.cash.toLocaleString()} | 🏦 BANK: $${S.bank.toLocaleString()}`],["❤️ HEALTH",`[${bar(S.hp,"█")}] ${S.hp}% | 🛡️ ARMOR: [${bar(S.ar,"▓")}] ${S.ar}%`],["🚨 WANTED",`[${"★".repeat(S.w)}${"☆".repeat(5-S.w)}] (${S.w} Star${S.w==1?"":"s"})`],["🎒 LOADOUT",`${l}${S.inv.length?" | "+S.inv.join(", "):""}`],["📻 RADIO",r],["🗺️ COORDS",z.s]];
return"╔"+"═".repeat(72)+"╗\n║"+"[ LOS SANTOS LIVE-FEED v5.0 ]".padStart(51).padEnd(72)+"║\n╠"+"═".repeat(72)+"╣\n"+rows.map(([a,b])=>("║ "+a+": "+b).slice(0,73).padEnd(73)+"║").join("\n")+"\n╚"+"═".repeat(72)+"╝"}
function options(){const o=[];const z=S.zone;
if(S.w>0){o.push(["Lose the cops (hide / break line of sight)",'hide']);o.push(S.gun?["Open fire on pursuers",'fight']:["Run for it",'hide']);o.push(S.veh?["Floor it out of the district",'travel']:["Carjack the nearest vehicle",'steal']);return o}
if(!S.veh)o.push(["Steal a car nearby",'steal']);else o.push(["Drive to another district",'travel']);
if(z=="Little Seoul"||z=="Vinewood"||z=="Davis"){o.push([S.gun?"Hold up the 24/7 store":"Visit Ammu-Nation",S.gun?'holdup':'ammu'])}
else if(z=="Mount Chiliad")o.push(["Base-jump off the summit",'jump']);
else if(z=="Sandy Shores")o.push(["Arm wrestle a local for cash",'arm']);
else if(z=="Mirror Park"||z=="Vespucci Beach")o.push(["Street race the locals",'race']);
else o.push(["Score and sell a bag on the corner",'deal']);
o.push([S.radio?"Change the radio station":"Switch on the radio",'radio']);
if(o.length<3)o.push(["Wait and watch the block",'wait']);return o.slice(0,3)}
const A={
steal(){if(S.veh)return"You're already behind the wheel.";const c=R(CARS);const cop=Math.random()<(S.w?0:.35);S.veh={n:c,hp:rnd(70,100),on:true};S.t+=.05;
if(cop){S.w=1;return`You slip into the ${c}, hand fishing under the visor. Keys. Engine catches. A patrol cruiser's lights snap on behind you. Wanted.`}return`Quick glance left, quick glance right. The ${c} coughs to life and you merge into traffic like you own it.`},
ammu(){S.ammu=true;const it=Object.entries(GUNS).map(([k,v])=>`${k} $${v.p}`).join(" | ");return`The clerk buzzes you in. Behind glass: ${it}. Type BUY <weapon> to purchase.`},
buy(a){const k=Object.keys(GUNS).find(g=>a.includes(g.toLowerCase().split(" ")[0]));if(!k)return"The clerk stares at you. 'We don't stock that.'";const g=GUNS[k];if(S.cash<g.p)return`${k} costs $${g.p}. You have $${S.cash}. The clerk shakes his head.`;S.cash-=g.p;S.gun=k;S.ammo=g.m*4;return`You buy the ${k} (${g.mag}, noise: ${g.noise}, recoil: ${g.rec}). ${S.ammo} rounds in the box. $${S.cash} left.`},
holdup(){if(!S.gun)return"Hard to rob anyone with your finger.";const g=rnd(300,900);S.cash+=g;S.w=Math.min(5,S.w+rnd(1,2));S.ammo=Math.max(0,S.ammo-1);return`You level the ${S.gun}. The cashier fumbles the drawer. You get $${g}. The silent alarm was already tripped. Wanted.`},
travel(a){const names=Object.keys(ZONES).filter(n=>n!=S.zone);const t=names.find(n=>a.toLowerCase().includes(n.toLowerCase()))||R(names);if(!S.veh)return`It's a long walk to ${t}. You need wheels.`;
S.zone=t;S.t+=.4;S.veh.hp=Math.max(10,S.veh.hp-rnd(0,6));if(S.w)S.heat+=1;S.w&&Math.random()<.4?S.w=Math.max(0,S.w-1):0;return`You cut through traffic and roll into ${t}. Tires hum, the skyline shifts.`},
hide(){if(Math.random()<.5){S.w=0;return"You duck through an alley, kill the lights, and hold your breath. Sirens pass. Your stars fade."}S.hp-=rnd(5,15);return"They spot you. A baton catches your ribs before you break free. Still hot."},
fight(){if(!S.gun||S.ammo<1)return"Click. No ammo.";S.ammo-=rnd(1,4);S.ammo=Math.max(0,S.ammo);S.hp-=rnd(5,25);S.w=Math.min(5,S.w+1);return`Muzzle flash. Glass explodes. The cruiser swerves but two more roll up. Escalation: ${STARS[S.w]}`},
radio(a){const ks=Object.keys(RADIO);const m=ks.find(k=>a.toLowerCase().includes(k.toLowerCase().split(" ")[0]))||R(ks);S.radio=m;S.tr++;return`You thumb the dial to ${m}. ${RADIO[m][S.tr%2]}`},
jump(){if(Math.random()<.7){S.cash+=200;return"You launch off the Chiliad edge, chute snaps open, you land on the road in a shower of gravel. A tourist tips you $200."}S.hp-=rnd(30,60);return"Wind slams you sideways. The landing is not graceful."},
arm(){if(Math.random()<.5){S.cash+=150;return"Forearm veins bulge. You slam his knuckles down. He pays $150."}S.cash=Math.max(0,S.cash-50);return"Your arm loses. $50 vanishes."},
race(){if(!S.veh)return"You need a car for a street race.";if(Math.random()<.5){S.cash+=400;S.veh.hp-=10;return"Three-wide through a red light, you clip a bollard and take the line. $400 in your palm."}S.veh.hp-=15;return"You get boxed out and finish last. Bodywork pays for it."},
deal(){const g=rnd(150,500);S.cash+=g;S.heat++;if(Math.random()<.3){S.w=1}return`A quick handoff behind a dumpster. You clear $${g}. ${S.w?"A patrol car noticed.":"Nobody the wiser."}`},
wait(){S.t+=.5;return"You let the block breathe. Time bleeds away."},
eat(){S.hp=Math.min(100,S.hp+15);S.cash=Math.max(0,S.cash-8);return"A $8 bowl of noodles. It helps."},
custom(a){return`You try: "${a}". The world takes it in stride. Nobody blinks. Some ideas: steal, buy, hold up, drive to <district>, radio <station>, hide, eat, wait.`}};
function parse(t){t=t.toLowerCase().trim();
if(/^(buy|purchase)/.test(t)){return A.buy(t)}
const m=[[/steal|carjack|hijack/,'steal'],[/ammu|gun ?store/,'ammu'],[/rob|hold ?up|stick ?up/,'holdup'],[/drive|go to|head to|travel/,'travel'],[/radio|station|music/,'radio'],[/hide|lose|hid/,'hide'],[/shoot|fight|fire|attack/,'fight'],[/jump/,'jump'],[/arm/,'arm'],[/race/,'race'],[/deal|sell/,'deal'],[/eat|noodle|food/,'eat'],[/wait|rest/,'wait']];
for(const[r,k]of m)if(r.test(t))return A[k](t);return A.custom(t)}
function ambient(){const z=ZONES[S.zone];let n=R(z.n);if(S.w)n+=` <span class="alert">${STARS[S.w]}</span>`;const w=R(["Smog hangs heavy.","A hot wind rolls through.","The sun bleeds orange.","Clouds gather over the hills."]);return`${n} ${w} `}
function step(inp){
if(S.hp<=0){S=fresh();return`WASTED. You wake outside the hospital, $${S.cash} lighter and your shoes are gone.`}
let res;if(/^[123]$/.test(inp.trim())){const o=options();const c=o[+inp-1];res=A[c[1]](inp)}else res=parse(inp);
S.turn++;S.t+=.05;S.hp=Math.max(0,S.hp);if(S.veh&&S.veh.hp<=0){S.veh=null;res+=" The car dies for good."}
if(S.w&&!S.veh&&Math.random()<.4){S.hp-=rnd(3,10)}if(!S.w&&S.heat>3){S.heat=0;S.w=1;res+=" Someone dropped a dime on you."}
if(S.hp<=0)res+=" <span class='alert'>WASTED.</span>";
const opts=options().map((o,i)=>`<div class="ch">[${i+1}] ${o[0]}</div>`).join("")+`<div class="ch">(Or type any custom action you want)</div>`;
return`<p>${res}</p><p class="cue">${ambient()}</p>${opts}`}
function show(html,you){const s=$("story");const d=document.createElement("div");d.className="turn";d.innerHTML=(you?`<div class="you">&gt; ${you.replace(/</g,"&lt;")}</div>`:"")+html;s.appendChild(d);s.scrollTop=s.scrollHeight;$("hud").textContent=hud()}
function intro(){$("story").innerHTML="";S=fresh();S.w=0;
show(`<p>It's ${clock()} under a scorching, smog-choked sun in Little Seoul. Exhaust from packed Vespucci Boulevard traffic mixes with cheap noodles from a food cart. You lean on a concrete pillar outside a 24/7, faded hoodie hanging off you. $450 in crumpled cash, a pack of matches, a burner phone. Across the street sits an unlocked Karin Asterope, keys in the visor. Two blocks over, Ammu-Nation's grate doors stand open. A patrol car idles at the red light fifty feet to your left.</p><p class="cue">${ZONES["Little Seoul"].n[0]}</p><div class="ch">[1] Steal the Asterope</div><div class="ch">[2] Visit Ammu-Nation</div><div class="ch">[3] Switch on the radio</div><div class="ch">(Or type any custom action you want)</div>`)}
$("f").onsubmit=e=>{e.preventDefault();const v=$("in").value;if(!v.trim())return;$("in").value="";show(step(v),v)};
$("save").onclick=()=>{localStorage.setItem("lsl",JSON.stringify(S));alert("Saved.")};
$("load").onclick=()=>{const d=localStorage.getItem("lsl");if(d){S=JSON.parse(d);show(`<p>Save loaded.</p>`)}};
$("new").onclick=intro;intro();
