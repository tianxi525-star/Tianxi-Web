export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryEn: string;
  year: string;
  description: string;
  descriptionEn: string;
  tags: string[];
  gradient: string; // Tailwind gradient classes or styling
  glowColor: string; // Tailwind ambient glow hex shadow
  coverImage?: string;
  albumUrl?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "case-01",
    title: "酷雪2026新品上市会",
    subtitle: "",
    category: "项目策划/方案撰写/现场流程对接",
    categoryEn: "Project Planning / Proposal / On-site Coordination",
    year: "2026",
    description: "负责项目方案撰写、活动流程规划及供应商统筹协调工作，推动发布内容与现场体验保持一致。项目围绕“春敏”这一真实消费场景展开，通过产品理念、专家内容与现场体验的有机结合，建立产品功效与消费者需求之间的情感连接，帮助品牌以更具共鸣感的方式传递新品价值。",
    descriptionEn: "Led the creative formulation and detailed flow execution of the CoolSnow 2026 Launch. Streamlined advanced mechanical setups, interactive layouts and spatial visuals to secure flawless live delivery.",
    tags: ["新品案例", "创意策划", "现场整合"],
    gradient: "from-purple-950 via-neutral-900 to-indigo-950/20",
    glowColor: "rgba(168, 85, 247, 0.15)",
    coverImage: "https://i.postimg.cc/xdZcCrNd/1-ku-xue2026.jpg",
    albumUrl: "https://m.alltuu.com/album/576f925cc0a926d00d23789e8d5cf1c8/?menu=live"
  },
  {
    id: "case-02",
    title: "酷雪2024产品全新升级发布会",
    subtitle: "",
    category: "供应商对接/现场流程对接/客户讲师课件美化",
    categoryEn: "Vendor Liaison / Operations / Presentation Aesthetics",
    year: "2024",
    description: "负责活动执行阶段的供应商沟通与现场流程协调，确保各环节按照既定节奏推进。同时参与讲师演讲内容的视觉优化工作，对课件进行统一设计与呈现规范梳理，提升发布内容的整体专业度与品牌一致性。",
    descriptionEn: "Coordinated structural and tech suppliers under tight timeframes. Remodeled the executive slides visually to match luxury brand identity and modern presentations.",
    tags: ["产品发布", "流程管理", "视觉优化"],
    gradient: "from-neutral-950 via-zinc-900 to-slate-900",
    glowColor: "rgba(148, 163, 184, 0.12)",
    coverImage: "https://i.postimg.cc/j202HzhX/2-ku-xue2024.jpg",
    albumUrl: "https://live.photoplus.cn/live/pc/25652653/#/live"
  },
  {
    id: "case-03",
    title: "东证衍生品研究院年度策略会",
    subtitle: "",
    category: "分会场导演/供应商管控对接",
    categoryEn: "Breakout Stage Director / Technical Lead",
    year: "2023",
    description: "负责分会场整体运行管理，统筹会议流程、屏幕内容切换及现场技术配合工作。协调同传、音视频及会务团队之间的协作，保障论坛内容输出与现场节奏稳定进行，为专业金融论坛提供高效的会议支持。",
    descriptionEn: "Directed the breakout strategy stage for Orient Securities, keeping complex cue sheets and video streams in strict alignment while managing physical vendors.",
    tags: ["学术策略会", "舞台控制", "会议运营"],
    gradient: "from-zinc-950 via-neutral-950 to-stone-900/30",
    glowColor: "rgba(120, 113, 108, 0.15)",
    coverImage: "https://i.postimg.cc/mZyBpfZt/3-dong-fang-zheng-quan2023.jpg",
    albumUrl: "https://live.jimage.cn/g/6hmhkocc?from=groupmessage"
  },
  {
    id: "case-04",
    title: "第五届中国甜品锦标赛",
    subtitle: "",
    category: "选手评委对接/赛事物料分配管理/现场流程对接",
    categoryEn: "Competitor Liaison / Logistics / On-site Flow",
    year: "2025",
    description: "参与赛事现场运营管理，负责评委、选手及工作人员之间的沟通协调工作，并统筹赛事物料分配与现场流程执行。协助保障比赛各环节顺利推进，同时配合赛事直播团队完成现场支持工作。",
    descriptionEn: "Facilitated China's elite confectionery championship. Covered international judge accommodation, player scheduling, professional oven logistics, and live broadcast flows.",
    tags: ["国家级赛事", "物料统筹", "现场执行"],
    gradient: "from-neutral-950 via-slate-900 to-zinc-900",
    glowColor: "rgba(56, 189, 248, 0.12)",
    coverImage: "https://i.postimg.cc/GmHRp4Fb/4-di-wu-jie-CPC.jpg",
    albumUrl: "https://live.jimage.cn/g/9b7hdfs9"
  },
  {
    id: "case-05",
    title: "艾恩摩尔专业乳品推荐会哈尔滨站",
    subtitle: "",
    category: "方案策划/客户对接/搭建以及现场流程管理",
    categoryEn: "Campaign Pitch / Client Lead / Production & Stage Directing",
    year: "2025",
    description: "负责哈尔滨站活动的整体策划与落地执行，包括前期方案输出、客户沟通协调及现场搭建管理。根据品牌传播需求规划活动流程，并结合产品演示与嘉宾互动环节，完成活动现场整体运营工作。",
    descriptionEn: "Owned the Harbin leg end-to-end: customized standard Irish dairy value propositions for local regions, monitored heavy kitchen installations, and prompted chef demos.",
    tags: ["乳品推介", "厨师展示", "设备搭建"],
    gradient: "from-stone-950 via-amber-950/20 to-neutral-900",
    glowColor: "rgba(245, 158, 11, 0.1)",
    coverImage: "https://i.postimg.cc/dVpYZJ6k/5-ai-en-mo-er-ha-er-bin-zhan.jpg",
    albumUrl: "https://live.photoplus.cn/live/pc/78565450/#/live"
  },
  {
    id: "case-06",
    title: "艾恩摩尔专业乳品推荐会成都站",
    subtitle: "",
    category: "方案策划/控台现场流程管理",
    categoryEn: "Campaign Pitch / AV Desk Operating",
    year: "2023",
    description: "参与成都站活动整体策划工作，并负责活动期间控台执行管理。协调灯光、音响、视频及现场演示等多个环节的同步运行，保障活动内容流畅呈现，为品牌产品推广营造良好的现场体验。",
    descriptionEn: "Structured Chengdu's event plan and oversaw the focal control desk during operation—ensuring seamless synergy between culinary artists and aesthetic lighting.",
    tags: ["方案策划", "控台管理", "名师发布"],
    gradient: "from-stone-950 via-zinc-900 to-emerald-950/10",
    glowColor: "rgba(16, 185, 129, 0.08)",
    coverImage: "https://i.postimg.cc/HWNRqWNT/6-ai-en-mo-er-cheng-dou-zhan-1.jpg",
    albumUrl: "https://www.yipai360.com/photolivepc/?orderId=202310201632438645&channel=h5&origin=qrcode"
  },
  {
    id: "case-07",
    title: "”奔流“第二季上海场启动仪式暨上海论坛",
    subtitle: "",
    category: "供应商对接/现场控台流程对接",
    categoryEn: "Technical Sourcing / Dual Bilingual Show Flow",
    year: "2025",
    description: "负责活动现场执行协调工作，对接同传、音视频及技术服务团队，参与论坛现场流程管理与主控台执行。通过多部门协作，保障论坛期间信息传递、内容展示及现场运行稳定有序。",
    descriptionEn: "Orchestrated the technical control panel for the high-end international forum, commanding bilingual screen assets, camera tracking, and live translation streams.",
    tags: ["奔流论坛", "国际对话", "双语控台"],
    gradient: "from-neutral-950 via-violet-950/20 to-neutral-900",
    glowColor: "rgba(168, 85, 247, 0.12)",
    coverImage: "https://i.postimg.cc/FRg563vt/7-ben-liu.png",
    albumUrl: "https://m.alltuu.com/album/2025051553/?menu=live"
  },
  {
    id: "case-08",
    title: "日清纺大陆精密机械(扬州)有限公司十周年发展大会",
    subtitle: "",
    category: "方案策划/客户对接/搭建以及现场流程管理",
    categoryEn: "Event Planning / Corporate Relations / On-site Operations",
    year: "2024",
    description: "负责企业十周年庆典活动的方案策划与落地执行，参与客户需求沟通、供应商管理及现场流程统筹工作。项目涵盖户外搭建、庆典仪式，通过细致的现场管理保障活动顺利完成。",
    descriptionEn: "Crafted the master concept for the marquee outdoor 10th anniversary, leading safety checks for massive temporal stages and directing structural bilingual programs.",
    tags: ["十周年庆典", "户外搭建", "中外协同"],
    gradient: "from-neutral-950 via-slate-950 to-cyan-950/20",
    glowColor: "rgba(6, 182, 212, 0.15)",
    coverImage: "https://i.postimg.cc/QNmZkQSD/8-ri-qing-fang-shi-zhou-nian.jpg",
    albumUrl: "https://live.photoplus.cn/live/pc/64180747/#/live"
  }
];

export const BIOGRAPHY_DATA = {
  name: "TIANXI / 田熙",
  role: "Experience Director",
  philosophy: "Every Experience Tells a Story.",
  philosophyEn: "Every Experience Tells a Story.",
  intro: `从品牌传播到线下体验，我始终相信，每一次与用户的接触，都是品牌故事的一部分。
我的工作不仅是策划一场活动，更是通过内容、空间与情绪的设计，让品牌被看见之前，先被感受到。
过去三年，我参与并负责医美、金融、制造业、食品等多个行业的品牌项目。从活动执行到项目管理，再到创意策划，这些经历看似不同，却让我逐渐意识到一件事：
人们很少记住活动的流程，却总会记住某个瞬间带来的感受。
因此，我开始尝试用体验连接品牌与人，用故事赋予空间意义。
让每一次相遇，都拥有被记住的理由。`,
  introEn: "From brand communication to offline experience, I always believe that every touchpoint with users is part of the brand story.\nMy job is not just to plan an event, but to design content, space and emotion so that the brand is felt before it is seen.\nOver the past three years, I have participated in and been responsible for brand projects in cosmetics, finance, manufacturing, food and other industries. These experiences may seem different, but they have made me realize that people rarely remember the details of an event but always remember the feeling of a moment."
};
