export const phraseGroups = [
  { id: 'daily', name: '日常口语', icon: '☕️' },
  { id: 'travel', name: '旅行实用', icon: '🧳' },
  { id: 'academic', name: '学术表达', icon: '🎓' },
  { id: 'writing', name: '写作句型', icon: '🖋️' },
  { id: 'emotion', name: '情绪表达', icon: '🌤️' },
];

export const phrases = [
  { id: 'p1', group: 'daily', en: "It's up to you.", zh: '由你决定。', note: '把选择权交给对方，轻松自然。', ex: "We can stay in or go out — it's up to you.", exZh: '我们可以待在家，也可以出去——由你决定。' },
  { id: 'p2', group: 'daily', en: "I'm on my way.", zh: '我在路上了。', note: '比 I will come soon 更地道。', ex: "Sorry, I'm on my way. Traffic is terrible.", exZh: '抱歉，我在路上了，交通很糟。' },
  { id: 'p3', group: 'daily', en: 'That works for me.', zh: '这个安排我可以。', note: '商量时间、计划时非常常用。', ex: "Friday at six? That works for me.", exZh: '周五六点？我可以。' },
  { id: 'p4', group: 'daily', en: 'I could use a hand.', zh: '我需要人搭把手。', note: 'could use 表示“需要、想要”，语气委婉。', ex: 'This box is heavy. I could use a hand.', exZh: '这个箱子很重，我需要人帮忙。' },
  { id: 'p5', group: 'daily', en: 'No rush.', zh: '不着急。', note: '让对方安心，不必赶时间。', ex: 'Take a look when you have time — no rush.', exZh: '你有空再看，不着急。' },
  { id: 'p6', group: 'daily', en: 'It slipped my mind.', zh: '我一时忘了。', note: '比 I forgot 更委婉，像“从脑子里滑走了”。', ex: "I'm sorry — it completely slipped my mind.", exZh: '抱歉，我完全忘了。' },
  { id: 'p7', group: 'daily', en: "I'm swamped.", zh: '我忙得不可开交。', note: 'swamped 原意是“被淹没”，口语里指忙疯了。', ex: "I'd love to help, but I'm swamped this week.", exZh: '我很想帮忙，但这周实在忙不过来。' },
  { id: 'p8', group: 'daily', en: "Let's play it by ear.", zh: '到时候看情况吧。', note: '不提前定死计划，随机应变。', ex: "We don't need a strict plan — let's play it by ear.", exZh: '不用定太死的计划，到时候看情况吧。' },
  { id: 'p9', group: 'daily', en: 'Take your time.', zh: '慢慢来，不着急。', note: '安抚对方，允许对方从容完成。', ex: 'Take your time — I can wait.', exZh: '慢慢来，我可以等。' },
  { id: 'p10', group: 'daily', en: 'I owe you one.', zh: '我欠你一个人情。', note: '朋友之间表达感谢，轻松不生硬。', ex: 'Thanks for covering for me. I owe you one.', exZh: '谢谢你帮我顶班，我欠你一个人情。' },

  { id: 'p11', group: 'travel', en: 'Could you point me in the right direction?', zh: '你能告诉我大致该往哪边走吗？', note: '比直接问 Where is... 更礼貌。', ex: 'Excuse me, could you point me in the right direction for the museum?', exZh: '打扰一下，你能告诉我博物馆该往哪边走吗？' },
  { id: 'p12', group: 'travel', en: "I'd like to check in.", zh: '我想办理入住。', note: '酒店前台标准表达；机场值机也可用。', ex: "Hello, I'd like to check in. The name is Li.", exZh: '你好，我想办理入住，姓李。' },
  { id: 'p13', group: 'travel', en: "What's the best way to get there?", zh: '去那里怎么走最方便？', note: '比 How can I go there 更自然，best 包含交通方式比较。', ex: "What's the best way to get to the old town?", exZh: '去老城区怎么走最方便？' },
  { id: 'p14', group: 'travel', en: 'Is it within walking distance?', zh: '走路能到吗？', note: 'within walking distance 是固定搭配。', ex: 'Is the station within walking distance from here?', exZh: '车站离这里走路能到吗？' },
  { id: 'p15', group: 'travel', en: 'Could I have the bill, please?', zh: '请给我账单好吗？', note: '英式用 bill，美式常用 check。', ex: 'Could I have the bill, please? We are in a hurry.', exZh: '请结账好吗？我们赶时间。' },
  { id: 'p16', group: 'travel', en: "I'm just browsing, thanks.", zh: '我只是随便看看，谢谢。', note: '店员问 Can I help you 时的礼貌回答。', ex: "I'm just browsing, thanks. I'll let you know if I need anything.", exZh: '我只是随便看看，谢谢。需要的话我会叫你。' },
  { id: 'p17', group: 'travel', en: 'Do you have this in a different size?', zh: '这件有别的尺码吗？', note: '购物必备；different color 也可替换。', ex: 'Do you have this in a different size? This one is too tight.', exZh: '这件有别的尺码吗？这件太紧了。' },
  { id: 'p18', group: 'travel', en: "I'd like to book a table for two.", zh: '我想订一张两人桌。', note: 'book a table 比 reserve 更口语。', ex: "I'd like to book a table for two at seven tonight.", exZh: '我想订今晚七点的两人桌。' },

  { id: 'p19', group: 'academic', en: 'This paper argues that...', zh: '本文认为……', note: '论文引言中提出核心论点的经典句式。', ex: 'This paper argues that reading habits shape critical thinking.', exZh: '本文认为阅读习惯塑造批判性思维。' },
  { id: 'p20', group: 'academic', en: 'The data suggest that...', zh: '数据表明……', note: '用 suggest 而非 prove，保留学术谨慎。', ex: 'The data suggest that sleep loss affects memory.', exZh: '数据表明睡眠不足会影响记忆。' },
  { id: 'p21', group: 'academic', en: 'It is worth noting that...', zh: '值得注意的是……', note: '引出重要但容易被忽略的信息。', ex: 'It is worth noting that the sample was relatively small.', exZh: '值得注意的是，样本量相对较小。' },
  { id: 'p22', group: 'academic', en: 'In contrast, ...', zh: '相比之下，……', note: '用于两个研究、观点或数据的鲜明对照。', ex: 'In contrast, the second group showed no improvement.', exZh: '相比之下，第二组没有表现出进步。' },
  { id: 'p23', group: 'academic', en: 'This raises the question of...', zh: '这引出了……的问题。', note: '从一个发现自然过渡到更深层的问题。', ex: 'This raises the question of how such habits are formed.', exZh: '这引出了这些习惯如何形成的问题。' },
  { id: 'p24', group: 'academic', en: 'A growing body of research shows...', zh: '越来越多的研究表明……', note: 'a growing body of 是学术写作高频搭配。', ex: 'A growing body of research shows that early reading matters.', exZh: '越来越多的研究表明早期阅读很重要。' },
  { id: 'p25', group: 'academic', en: 'To put it another way, ...', zh: '换句话说，……', note: '用来换一种更清楚的说法，避免读者掉队。', ex: 'To put it another way, quantity is not the same as quality.', exZh: '换句话说，数量不等于质量。' },
  { id: 'p26', group: 'academic', en: 'The findings should be interpreted with caution.', zh: '应谨慎解读这些发现。', note: '承认研究局限，是成熟学术表达。', ex: 'Given the small sample, the findings should be interpreted with caution.', exZh: '鉴于样本量小，应谨慎解读这些发现。' },

  { id: 'p27', group: 'writing', en: 'From where I stand, ...', zh: '在我看来，……', note: '比 I think 更有个人立场和画面感。', ex: 'From where I stand, the benefits are hard to ignore.', exZh: '在我看来，这些好处很难忽视。' },
  { id: 'p28', group: 'writing', en: 'It is often assumed that..., yet...', zh: '人们常以为……，然而……', note: '先立后破，适合议论文开头。', ex: 'It is often assumed that talent decides success, yet effort matters just as much.', exZh: '人们常以为天赋决定成功，然而努力同样重要。' },
  { id: 'p29', group: 'writing', en: 'The benefits far outweigh the drawbacks.', zh: '利远大于弊。', note: 'outweigh 是“比……更重要”，写作高频。', ex: 'For most students, the benefits of reading widely far outweigh the drawbacks.', exZh: '对大多数学生来说，广泛阅读利远大于弊。' },
  { id: 'p30', group: 'writing', en: 'Not only..., but it also...', zh: '不仅……，而且……', note: 'Not only 置于句首时，前一分句要部分倒装。', ex: 'Not only does reading broaden our horizons, but it also sharpens our language.', exZh: '阅读不仅开阔视野，也磨炼语言。' },
  { id: 'p31', group: 'writing', en: 'While it is true that..., ...', zh: '诚然……，但……', note: '先承认对方合理之处，再提出自己的观点。', ex: 'While it is true that technology saves time, it can also fragment attention.', exZh: '诚然科技节省时间，但它也会割裂注意力。' },
  { id: 'p32', group: 'writing', en: 'Ultimately, ...', zh: '归根结底，……', note: '结尾收束，把讨论拉回核心判断。', ex: 'Ultimately, learning a language is a matter of daily contact.', exZh: '归根结底，学语言靠的是每天接触。' },

  { id: 'p33', group: 'emotion', en: "I'm over the moon.", zh: '我高兴极了。', note: '英式口语，形容欣喜若狂。', ex: "She's over the moon about the scholarship.", exZh: '她拿到奖学金，高兴极了。' },
  { id: 'p34', group: 'emotion', en: "It's not the end of the world.", zh: '天还没塌下来。', note: '安慰别人，别把挫折看得太重。', ex: "You failed one test — it's not the end of the world.", exZh: '你只考砸了一次，天还没塌下来。' },
  { id: 'p35', group: 'emotion', en: "I can't thank you enough.", zh: '感激不尽。', note: '比 Thank you very much 情感更重。', ex: "I can't thank you enough for your help.", exZh: '你的帮助让我感激不尽。' },
  { id: 'p36', group: 'emotion', en: 'That means a lot to me.', zh: '这对我意义重大。', note: '回应别人的支持、礼物或善意。', ex: 'You remembered my birthday. That means a lot to me.', exZh: '你记得我的生日，这对我意义重大。' },
  { id: 'p37', group: 'emotion', en: "I'm torn between...", zh: '我在……之间难以取舍。', note: 'torn 表示被两个选择撕扯。', ex: "I'm torn between taking the job and staying here.", exZh: '我在接受这份工作和留在这里之间难以取舍。' },
  { id: 'p38', group: 'emotion', en: 'It took a weight off my mind.', zh: '我心里的一块石头落地了。', note: '形容解除担忧后的轻松。', ex: 'Hearing that she was safe took a weight off my mind.', exZh: '听说她平安，我心里的一块石头落地了。' },
  { id: 'p39', group: 'emotion', en: "I'm keeping my fingers crossed.", zh: '我替你祈祷好运。', note: '口语里表示“但愿顺利”。', ex: "I'm keeping my fingers crossed for your interview.", exZh: '我祝你面试顺利。' },
  { id: 'p40', group: 'emotion', en: 'It was a blessing in disguise.', zh: '塞翁失马，焉知非福。', note: '当时看似坏事，后来发现是好事。', ex: 'Losing that job was a blessing in disguise.', exZh: '失去那份工作，后来看反而是件好事。' },
];

export const phraseById = Object.fromEntries(phrases.map((phrase) => [phrase.id, phrase]));
