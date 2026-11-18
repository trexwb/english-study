export const grammarLessons = [
  {
    id: 'g1',
    title: '一般现在时 vs 现在进行时',
    en: 'Simple Present vs Present Continuous',
    level: '基础',
    mins: 6,
    intro: '一个讲“常态”，一个讲“此刻”。先问自己：这是长期事实，还是正在发生？',
    sections: [
      {
        h: '一般现在时：事实、习惯、规律',
        body: '主语是 he / she / it 时，动词加 -s 或 -es。常与 always、usually、every day 连用。它描述的是“通常如此”，不是“此刻正在”。',
        examples: [
          { en: 'She walks to school every morning.', zh: '她每天早上步行上学。' },
          { en: 'Water boils at 100°C.', zh: '水在一百摄氏度沸腾。' },
        ],
      },
      {
        h: '现在进行时：此刻、近期、变化中',
        body: '结构是 am / is / are + doing。它可以表示说话这一刻正在发生，也可以表示现阶段正在进行、但说话时未必在做的事。',
        examples: [
          { en: 'She is walking to school right now.', zh: '她此刻正步行去学校。' },
          { en: 'I am reading a novel by Austen these days.', zh: '我最近在读奥斯汀的小说。' },
        ],
      },
      {
        h: '这些动词通常不用进行时',
        body: '表示状态而非动作的动词，如 know、believe、belong、need、prefer、seem，通常用一般现在时。但当词义变成“动作”时可以例外：I’m thinking about it.（我正在考虑。）',
        examples: [
          { en: 'I know the answer.', zh: '我知道答案。' },
          { en: 'This book belongs to me.', zh: '这本书是我的。' },
        ],
      },
    ],
    pitfall: '看到 now 不一定用进行时：Now I understand.（我现在明白了。）understand 是状态，仍用一般现在时。',
    quiz: [
      {
        q: 'My brother ____ coffee every morning, but today he ____ tea.',
        opts: ['drinks; is drinking', 'is drinking; drinks', 'drinks; drinks', 'is drinking; is drinking'],
        a: 0,
        explain: 'every morning 是习惯，用一般现在时；today 表示今天这个例外，用进行时。',
      },
      {
        q: 'Which sentence is correct?',
        opts: ['I am knowing the answer.', 'I know the answer.', 'I knowing the answer.', 'I am know the answer.'],
        a: 1,
        explain: 'know 表示状态，通常不用进行时。',
      },
      {
        q: '“The train ____ at 7:30 every day.” 应填：',
        opts: ['is leaving', 'leaves', 'leave', 'has left'],
        a: 1,
        explain: '时刻表、固定安排用一般现在时；主语 the train 是第三人称单数，所以 leaves。',
      },
    ],
  },
  {
    id: 'g2',
    title: '一般过去时 vs 现在完成时',
    en: 'Past Simple vs Present Perfect',
    level: '基础',
    mins: 7,
    intro: '关键不在“过去”，而在“和现在有没有关系”。有明确过去时间，用一般过去时。',
    sections: [
      {
        h: '一般过去时：把事放回过去',
        body: '强调过去某个时间发生并结束的动作或状态，常与 yesterday、last week、in 2019、two days ago 连用。',
        examples: [
          { en: 'I finished the book last night.', zh: '我昨晚读完了这本书。' },
          { en: 'She lived in Paris for three years.', zh: '她曾在巴黎住过三年。（现在不住）' },
        ],
      },
      {
        h: '现在完成时：过去的事，现在的结果',
        body: '结构是 have / has + done。它不关心动作发生的确切时间，而关心经历、结果或持续到现在。常与 already、yet、ever、never、just、for、since 连用。',
        examples: [
          { en: 'I have finished the book, so I can lend it to you.', zh: '我已经读完这本书了，可以借给你。' },
          { en: 'She has lived in Paris for three years.', zh: '她已在巴黎住了三年。（现在仍住）' },
        ],
      },
      {
        h: 'for 与 since',
        body: 'for 接一段时间：for three years；since 接时间点：since 2021、since I was a child。二者都常与完成时搭配。',
        examples: [
          { en: 'We have known each other since university.', zh: '我们从大学起就认识。' },
          { en: 'He has worked here for six months.', zh: '他在这里工作六个月了。' },
        ],
      },
    ],
    pitfall: '不要写 I have seen him yesterday. 有了 yesterday 这个明确过去时间，就该用 I saw him yesterday.',
    quiz: [
      {
        q: 'I ____ this film three times. It is my favorite.',
        opts: ['saw', 'have seen', 'see', 'had seen'],
        a: 1,
        explain: 'three times 表示到目前为止的经历，用现在完成时。',
      },
      {
        q: 'She ____ her keys, so she cannot open the door.',
        opts: ['lost', 'has lost', 'loses', 'is losing'],
        a: 1,
        explain: '过去丢钥匙，导致现在打不开门，强调现在的结果，用现在完成时。',
      },
      {
        q: 'Which sentence is NOT correct?',
        opts: ['I have just finished lunch.', 'I finished lunch an hour ago.', 'I have finished lunch an hour ago.', 'I have never been to Japan.'],
        a: 2,
        explain: 'an hour ago 是明确的过去时间，不能与现在完成时连用。',
      },
    ],
  },
  {
    id: 'g3',
    title: '冠词 a / an / the 的底层逻辑',
    en: 'Articles: A, An, The',
    level: '基础',
    mins: 6,
    intro: 'a/an 是“任意一个”，the 是“我们都指得出来的那个”。零冠词则常表示泛指。',
    sections: [
      {
        h: 'a / an：第一次提到，或“某一个”',
        body: '可数名词单数表示泛指时，需要 a/an。选择 a 还是 an 看的是后面单词的读音，不是字母：an hour（元音音素开头）、a university（辅音 /j/ 开头）。',
        examples: [
          { en: 'I saw a dog in the park. The dog was very friendly.', zh: '我在公园看到一只狗。那只狗很友好。' },
          { en: 'She is an honest person.', zh: '她是个诚实的人。' },
        ],
      },
      {
        h: 'the：双方都知道，或独一无二',
        body: '第二次提到、有短语限定、或世界上独一无二的事物，用 the。最高级和序数词前通常也用 the。',
        examples: [
          { en: 'Please close the window.', zh: '请关上窗户。（双方都知道是哪扇）' },
          { en: 'The sun rises in the east.', zh: '太阳从东方升起。' },
        ],
      },
      {
        h: '零冠词：泛指、抽象、专有',
        body: '复数名词或不可数名词表示泛指时不用冠词；语言、学科、三餐、多数国名和城市名通常也不用。',
        examples: [
          { en: 'Books open doors.', zh: '书籍打开大门。' },
          { en: 'She studies history at university.', zh: '她在大学学习历史。' },
        ],
      },
    ],
    pitfall: '表示“从事某种职业”时说 work as a teacher，不要漏掉 a；但系动词后表示身份时也要冠词：He is a doctor.',
    quiz: [
      {
        q: 'It took me ____ hour to finish ____ article you sent me.',
        opts: ['a; an', 'an; the', 'an; a', 'a; the'],
        a: 1,
        explain: 'hour 的 h 不发音，以元音音素开头用 an；article 在这里是双方明确的那篇文章，用 the。',
      },
      {
        q: '____ life is full of surprises.',
        opts: ['A', 'The', 'An', '（不填）'],
        a: 3,
        explain: 'life 表示“生活”这一抽象概念时，泛指不用冠词。',
      },
      {
        q: 'Which is correct?',
        opts: ['She is engineer.', 'She is an engineer.', 'She is the engineer of a company.', 'She is engineer at company.'],
        a: 1,
        explain: '可数名词单数表示职业身份，需要不定冠词；engineer 以元音音素开头，用 an。',
      },
    ],
  },
  {
    id: 'g4',
    title: '介词 in / on / at 与 for / since',
    en: 'Prepositions of Time and Place',
    level: '基础',
    mins: 6,
    intro: '把时间想成容器、平面和点：in 大容器，on 具体一天，at 一个点。',
    sections: [
      {
        h: '时间：in > on > at',
        body: 'in 用于年、月、季节、较长时段；on 用于具体某天或某天的上午下午；at 用于钟点、夜晚和某些固定表达。',
        examples: [
          { en: 'in 2026, in July, in winter', zh: '在 2026 年、七月、冬天' },
          { en: 'on Monday, on May 1st, on the morning of May 1st', zh: '在周一、五月一日、五月一日上午' },
          { en: 'at 7:30, at night, at noon', zh: '在七点半、夜里、中午' },
        ],
      },
      {
        h: '地点：in / on / at',
        body: 'in 表示在某个空间内部；on 表示在表面上或沿某条线；at 表示一个具体点或场所。',
        examples: [
          { en: 'in the room, on the wall, at the door', zh: '在房间里、在墙上、在门口' },
          { en: 'on the river, at the station', zh: '在河上、在车站' },
        ],
      },
      {
        h: 'for 与 since：长度 vs 起点',
        body: 'for 后面接一段时间，since 后面接起点。回答 How long...? 时，两者都常见。',
        examples: [
          { en: 'I have studied English for six years.', zh: '我学英语六年了。' },
          { en: 'I have studied English since 2020.', zh: '我从 2020 年开始学英语。' },
        ],
      },
    ],
    pitfall: 'last、next、this、every 前面通常不加介词：next Monday，不是 on next Monday。',
    quiz: [
      {
        q: 'We will meet ____ Friday ____ 6 p.m.',
        opts: ['in; at', 'on; at', 'at; on', 'on; in'],
        a: 1,
        explain: '具体某天用 on，钟点用 at。',
      },
      {
        q: 'She has lived here ____ 2018.',
        opts: ['for', 'since', 'from', 'in'],
        a: 1,
        explain: '2018 是起点，用 since；for 后面应接七年这样的时间段。',
      },
      {
        q: 'The keys are ____ the table.',
        opts: ['in', 'on', 'at', 'to'],
        a: 1,
        explain: '钥匙在桌子表面上，用 on。',
      },
    ],
  },
  {
    id: 'g5',
    title: '主谓一致：找到真正的主语',
    en: 'Subject–Verb Agreement',
    level: '进阶',
    mins: 7,
    intro: '先删掉插在主语和动词之间的修饰语，再决定动词单复数。',
    sections: [
      {
        h: '跳过介词短语',
        body: 'The list of names 的主语是 list，不是 names；The quality of the products 的主语是 quality。先找中心名词。',
        examples: [
          { en: 'The list of names is on the desk.', zh: '名单在桌上。' },
          { en: 'The quality of these products is excellent.', zh: '这些产品的质量很好。' },
        ],
      },
      {
        h: 'either...or / neither...nor 就近原则',
        body: '由 either...or、neither...nor、not only...but also 连接主语时，动词与最近的主语一致。',
        examples: [
          { en: 'Neither the teacher nor the students were ready.', zh: '老师和学生都没准备好。' },
          { en: 'Either you or she is right.', zh: '要么你对，要么她对。' },
        ],
      },
      {
        h: '这些词通常看作单数',
        body: 'each、every、everyone、someone、nobody、either、neither 作主语时通常用单数。集合名词如 team、family 强调整体时用单数，强调成员时可用复数。',
        examples: [
          { en: 'Everyone has a role to play.', zh: '每个人都有要扮演的角色。' },
          { en: 'The team is working well together.', zh: '这个团队合作得很好。' },
        ],
      },
    ],
    pitfall: '“There is / There are” 要看后面的真正主语：There are three books on the desk.',
    quiz: [
      {
        q: 'The number of students ____ increasing.',
        opts: ['are', 'is', 'have', 'were'],
        a: 1,
        explain: '主语是 the number（数量），不是 students，所以用单数 is。',
      },
      {
        q: 'Neither my parents nor my sister ____ interested in tennis.',
        opts: ['are', 'is', 'be', 'were'],
        a: 1,
        explain: 'neither...nor 遵循就近原则，最近的主语 my sister 是单数。',
      },
      {
        q: 'Every one of the answers ____ checked twice.',
        opts: ['were', 'are', 'was', 'have'],
        a: 2,
        explain: 'every one 表示每一个，作主语时用单数；这里是被动语态，所以 was checked。',
      },
    ],
  },
  {
    id: 'g6',
    title: '定语从句：who / which / that',
    en: 'Relative Clauses',
    level: '进阶',
    mins: 8,
    intro: '定语从句就是放在名词后面的一整个形容词。先判断先行词是人还是物，再看它在从句里做什么成分。',
    sections: [
      {
        h: '基本选择',
        body: '先行词是人，常用 who / that；先行词是物，常用 which / that。whose 表示所属关系；where 在从句中作地点状语。',
        examples: [
          { en: 'The woman who teaches us English is from Canada.', zh: '教我们英语的那位女士来自加拿大。' },
          { en: 'This is the book that changed my mind.', zh: '这就是那本改变了我看法的书。' },
        ],
      },
      {
        h: '限制性 vs 非限制性',
        body: '限制性从句提供必要信息，不用逗号；非限制性从句提供补充信息，用逗号隔开，通常不用 that。',
        examples: [
          { en: 'My brother who lives in Beijing is a doctor.', zh: '我那个住在北京的哥哥是医生。（可能还有别的哥哥）' },
          { en: 'My brother, who lives in Beijing, is a doctor.', zh: '我哥哥是医生，他住在北京。（只有一个哥哥）' },
        ],
      },
      {
        h: '介词提前与省略',
        body: '正式文体中，介词可以提到 which / whom 前：the city in which I grew up。关系代词在从句中作宾语时可以省略：the book (that) I bought。',
        examples: [
          { en: 'The house in which she grew up is still standing.', zh: '她长大的那所房子还在。' },
          { en: 'The film (that) we watched last night was amazing.', zh: '我们昨晚看的那部电影很棒。' },
        ],
      },
    ],
    pitfall: '从句缺主语用 who/which/that，缺状语才用 where。不要说 the city where I visited，应为 the city that I visited。',
    quiz: [
      {
        q: 'The man ____ car was stolen called the police.',
        opts: ['who', 'whose', 'which', 'where'],
        a: 1,
        explain: 'car 与 man 是所属关系，用 whose。',
      },
      {
        q: 'This is the factory ____ we visited last week.',
        opts: ['where', 'which', 'who', 'whose'],
        a: 1,
        explain: 'visit 后缺宾语，先行词是物，用 which / that；where 只能作地点状语。',
      },
      {
        q: 'Which sentence needs commas?',
        opts: ['The book that I borrowed is due tomorrow.', 'My father who is a teacher loves reading.', 'The city that I love most is Kyoto.', 'The girl who won the prize is my cousin.'],
        a: 1,
        explain: '若“我父亲”只有一个，who is a teacher 是补充信息，应用逗号隔开；其余为限制性信息。',
      },
    ],
  },
  {
    id: 'g7',
    title: '名词性从句：that 与 what',
    en: 'Noun Clauses: That vs What',
    level: '进阶',
    mins: 8,
    intro: '从句在句中当名词用：作主语、宾语、表语或同位语。that 不充当成分，what 必须在从句里充当主语或宾语。',
    sections: [
      {
        h: 'that：只起连接作用',
        body: 'that 后面的从句本身结构完整。宾语从句中的 that 常可省略；主语从句放在句首时通常保留。',
        examples: [
          { en: 'I believe (that) practice makes perfect.', zh: '我相信熟能生巧。' },
          { en: 'That he passed the exam surprised everyone.', zh: '他通过考试这件事让所有人惊讶。' },
        ],
      },
      {
        h: 'what：等于 the thing(s) that',
        body: 'what 在从句中必须作主语、宾语或表语。可以用 what 替换“the thing that”，但不能同时保留 that。',
        examples: [
          { en: 'What you need is more sleep.', zh: '你需要的是更多睡眠。' },
          { en: 'I cannot understand what he means.', zh: '我不明白他的意思。' },
        ],
      },
      {
        h: '语序：从句用陈述语序',
        body: '无论主句是不是疑问句，名词性从句都用“主语 + 动词”的陈述语序。',
        examples: [
          { en: 'Could you tell me where the station is?', zh: '你能告诉我车站在哪里吗？' },
          { en: 'The question is whether we should go.', zh: '问题是我们是否应该去。' },
        ],
      },
    ],
    pitfall: '不要写 I don’t know what is his name. 应为 what his name is，因为从句要用陈述语序。',
    quiz: [
      {
        q: '____ he said at the meeting surprised us all.',
        opts: ['That', 'What', 'Which', 'Whether'],
        a: 1,
        explain: 'said 后缺宾语，what 在从句中作 said 的宾语。',
      },
      {
        q: 'I don’t know ____ he will come or not.',
        opts: ['that', 'what', 'whether', 'if'],
        a: 2,
        explain: '与 or not 搭配通常用 whether，不用 if。',
      },
      {
        q: 'Could you tell me ____?',
        opts: ['where is the museum', 'where the museum is', 'where is museum', 'the museum where is'],
        a: 1,
        explain: '宾语从句用陈述语序：where the museum is。',
      },
    ],
  },
  {
    id: 'g8',
    title: '非谓语：to do / doing / done',
    en: 'To do, Doing, Done',
    level: '进阶',
    mins: 9,
    intro: '一个句子里已经有谓语，其他动词就要“降级”成非谓语。先看它和逻辑主语是主动、被动，还是目的。',
    sections: [
      {
        h: 'to do：目的、将来、特定搭配',
        body: '表示目的、计划或将来的动作；也用于 decide to do、want to do、be likely to do 等搭配。',
        examples: [
          { en: 'She went out to buy some milk.', zh: '她出去买牛奶。' },
          { en: 'I decided to start a reading habit.', zh: '我决定养成阅读习惯。' },
        ],
      },
      {
        h: 'doing：主动、进行、习惯',
        body: '表示主动或正在进行的动作；也可作主语、介词宾语。enjoy / avoid / mind / finish 后接 doing。',
        examples: [
          { en: 'Reading before bed helps me relax.', zh: '睡前阅读帮我放松。' },
          { en: 'He avoided answering the question.', zh: '他避开了这个问题。' },
        ],
      },
      {
        h: 'done：被动、完成',
        body: '过去分词表示被动或完成，逻辑主语通常是动作的承受者。',
        examples: [
          { en: 'The book written by her became a bestseller.', zh: '她写的那本书成了畅销书。' },
          { en: 'Seen from above, the city looks like a map.', zh: '从高处看，这座城市像一张地图。' },
        ],
      },
    ],
    pitfall: '注意逻辑主语：Walking home, I saw a rainbow. 走路的是 I；如果写 Walking home, the rain stopped. 就成了雨在走路。',
    quiz: [
      {
        q: 'She is used to ____ up early.',
        opts: ['get', 'getting', 'got', 'be getting'],
        a: 1,
        explain: 'be used to 中的 to 是介词，后面接 doing，表示习惯于。',
      },
      {
        q: '____ from the hill, the village looks beautiful.',
        opts: ['Seeing', 'Seen', 'To see', 'See'],
        a: 1,
        explain: '村庄是被看的，逻辑主语 village 与 see 是被动关系，用过去分词。',
      },
      {
        q: 'He saved money ____ a new laptop.',
        opts: ['buying', 'to buy', 'bought', 'buy'],
        a: 1,
        explain: '省钱的目的是买电脑，用 to do 表目的。',
      },
    ],
  },
  {
    id: 'g9',
    title: '虚拟语气：与事实相反',
    en: 'The Subjunctive Mood',
    level: '高阶',
    mins: 9,
    intro: '虚拟语气不是“更客气”，而是明确告诉对方：这件事与现在或过去的事实相反。',
    sections: [
      {
        h: '与现在相反：过去式 + would do',
        body: 'If + 主语 + 一般过去时（be 通常用 were），主句用 would / could / might + 动词原形。',
        examples: [
          { en: 'If I had more time, I would read more.', zh: '如果我时间更多，我会读更多书。（其实时间不多）' },
          { en: 'If I were you, I would apologize.', zh: '如果我是你，我会道歉。' },
        ],
      },
      {
        h: '与过去相反：had done + would have done',
        body: '从句用 had + 过去分词，主句用 would have + 过去分词，表示对过去的遗憾或假设。',
        examples: [
          { en: 'If she had studied harder, she would have passed.', zh: '如果她当时更努力，她本可以通过。' },
        ],
      },
      {
        h: 'wish 与 suggest',
        body: 'wish 后接过去式表示与现在相反，接 had done 表示与过去相反。suggest / insist / demand 后的 that 从句常用动词原形。',
        examples: [
          { en: 'I wish I knew the answer.', zh: '我真希望我知道答案。' },
          { en: 'The doctor suggested that he rest for a week.', zh: '医生建议他休息一周。' },
        ],
      },
    ],
    pitfall: '虚拟条件句里不要在主句再用 will：If it rains tomorrow, I will stay home. 这是真实条件，不是虚拟；虚拟才用 would。',
    quiz: [
      {
        q: 'If I ____ taller, I would try out for the team.',
        opts: ['am', 'was', 'were', 'will be'],
        a: 2,
        explain: '与现在事实相反，be 动词通常用 were。',
      },
      {
        q: 'If he had left earlier, he ____ the train.',
        opts: ['would catch', 'would have caught', 'caught', 'will catch'],
        a: 1,
        explain: '与过去事实相反，主句用 would have + 过去分词。',
      },
      {
        q: 'I wish I ____ more attention in class yesterday.',
        opts: ['paid', 'had paid', 'pay', 'would pay'],
        a: 1,
        explain: 'yesterday 指过去，wish 后与过去相反用 had done。',
      },
    ],
  },
  {
    id: 'g10',
    title: '倒装与强调：让句子有力量',
    en: 'Inversion and Emphasis',
    level: '高阶',
    mins: 8,
    intro: '把不常放在句首的成分提前，就会触发倒装。写作里偶尔用一次，重点立刻凸显。',
    sections: [
      {
        h: '否定意义副词提前，部分倒装',
        body: 'Never、Seldom、Rarely、Hardly、Not only 等放在句首时，助动词提前：Never have I seen such courage.',
        examples: [
          { en: 'Not only did she finish first, but she also helped others.', zh: '她不仅第一个完成，还帮助了别人。' },
          { en: 'Rarely do we stop to notice the small things.', zh: '我们很少停下来留意小事。' },
        ],
      },
      {
        h: 'only + 状语提前',
        body: 'Only 修饰状语并置于句首时，主句部分倒装；如果 only 修饰主语，则不倒装。',
        examples: [
          { en: 'Only then did I realize my mistake.', zh: '直到那时我才意识到自己的错误。' },
          { en: 'Only she knew the truth.', zh: '只有她知道真相。' },
        ],
      },
      {
        h: 'it 强调句',
        body: 'It is / was + 被强调部分 + that / who + 其余部分。去掉 It is...that 后，句子仍应完整。',
        examples: [
          { en: 'It was in that small library that I fell in love with reading.', zh: '正是在那家小图书馆里，我爱上了阅读。' },
          { en: 'It is practice that makes the difference.', zh: '真正带来差别的是练习。' },
        ],
      },
    ],
    pitfall: '倒装只提前助动词，不要提前实义动词：Never I have seen... 错，Never have I seen... 对。',
    quiz: [
      {
        q: 'Never ____ such a beautiful sunset.',
        opts: ['I have seen', 'have I seen', 'I saw', 'did I saw'],
        a: 1,
        explain: 'Never 置于句首，助动词 have 提前，构成部分倒装。',
      },
      {
        q: 'It was in 2019 ____ we first met.',
        opts: ['when', 'that', 'which', 'where'],
        a: 1,
        explain: '强调时间状语用 It was...that 结构，不用 when。',
      },
      {
        q: 'Only by practicing every day ____ improve.',
        opts: ['you can', 'can you', 'you will', 'do you'],
        a: 1,
        explain: 'Only + 方式状语置于句首，主句部分倒装，情态动词 can 提前。',
      },
    ],
  },
  {
    id: 'g11',
    title: '比较级、最高级与倍数',
    en: 'Comparison and Multiples',
    level: '进阶',
    mins: 7,
    intro: '比较必须有对象，最高级必须有范围。倍数表达则要记住“倍数 + as ... as”的骨架。',
    sections: [
      {
        h: '比较级：than 前后要对称',
        body: '短形容词加 -er，长形容词用 more。比较对象要一致：My car is faster than hers. 不是 than she。',
        examples: [
          { en: 'This book is more interesting than the one I read last month.', zh: '这本书比我上个月读的那本更有趣。' },
          { en: 'The weather is getting warmer.', zh: '天气越来越暖和。' },
        ],
      },
      {
        h: '最高级：the + 范围',
        body: '最高级前通常加 the，并给出 in / of 范围。one of the + 最高级 + 复数名词表示“最……之一”。',
        examples: [
          { en: 'It is one of the best novels I have ever read.', zh: '这是我读过的最好的小说之一。' },
          { en: 'She is the tallest student in her class.', zh: '她是班上最高的学生。' },
        ],
      },
      {
        h: '倍数与程度修饰',
        body: 'A is three times as large as B. / A is three times larger than B. 修饰比较级用 much、far、a lot、slightly，不用 very。',
        examples: [
          { en: 'This room is twice as big as mine.', zh: '这个房间是我的两倍大。' },
          { en: 'The second test was much harder.', zh: '第二次测试难得多。' },
        ],
      },
    ],
    pitfall: '不要说 more better 或 most easiest；比较级和最高级不能重复叠加。',
    quiz: [
      {
        q: 'This bag is ____ than that one.',
        opts: ['expensive', 'more expensive', 'most expensive', 'much expensive'],
        a: 1,
        explain: '多音节形容词的比较级用 more + 原级。',
      },
      {
        q: 'My hometown is ____ beautiful than I remembered.',
        opts: ['very', 'much', 'more much', 'most'],
        a: 1,
        explain: '修饰比较级用 much，不能用 very。',
      },
      {
        q: 'It is one of ____ films of the year.',
        opts: ['good', 'better', 'the best', 'best'],
        a: 2,
        explain: 'one of the + 最高级 + 复数名词是固定结构。',
      },
    ],
  },
  {
    id: 'g12',
    title: '连接词：让作文有逻辑',
    en: 'Linking Words That Actually Work',
    level: '高阶',
    mins: 7,
    intro: '连接词不是装饰，而是路标。先想清楚两个句子是什么关系，再选词。',
    sections: [
      {
        h: '递进、对比、因果',
        body: '递进：moreover、furthermore、in addition；对比：however、nevertheless、on the other hand；因果：therefore、consequently、as a result。',
        examples: [
          { en: 'The plan is expensive; however, it may save money in the long run.', zh: '这个计划很贵；不过从长远看可能省钱。' },
          { en: 'He missed the deadline; consequently, the project was delayed.', zh: '他错过了截止日期，结果项目被延误。' },
        ],
      },
      {
        h: '让步与举例',
        body: '让步：although、even though、while、despite + 名词；举例：for instance、such as、a case in point。',
        examples: [
          { en: 'Although the task was difficult, she finished it on time.', zh: '尽管任务很难，她还是按时完成了。' },
          { en: 'Many habits, such as reading daily, shape our thinking.', zh: '许多习惯，比如每天阅读，会塑造我们的思维。' },
        ],
      },
      {
        h: '标点：however 不是连词',
        body: 'however、therefore、moreover 是副词，不能像 but 一样直接连接两个完整句子。要用句号或分号隔开，并加逗号。',
        examples: [
          { en: 'The weather was bad. Nevertheless, we went hiking.', zh: '天气不好。尽管如此，我们还是去徒步了。' },
          { en: 'The weather was bad; nevertheless, we went hiking.', zh: '天气不好；尽管如此，我们还是去徒步了。' },
        ],
      },
    ],
    pitfall: '不要写 The weather was bad, however we went out. 应改为 ...bad. However, we went out. 或 ...bad, but we went out.',
    quiz: [
      {
        q: 'The road was closed; ____, we took a longer route.',
        opts: ['therefore', 'although', 'because', 'such as'],
        a: 0,
        explain: '前因后果，用 therefore。',
      },
      {
        q: '____ the high price, the phone sold well.',
        opts: ['Although', 'Despite', 'However', 'Because'],
        a: 1,
        explain: 'the high price 是名词短语，用 despite；although 后要接完整句子。',
      },
      {
        q: 'Which sentence is punctuated correctly?',
        opts: ['It rained, however we stayed home.', 'It rained. However, we stayed home.', 'It rained however, we stayed home.', 'It rained; however we stayed home.'],
        a: 1,
        explain: 'however 是连接副词，前面用句号或分号，后面加逗号。',
      },
    ],
  },
];

export const grammarById = Object.fromEntries(grammarLessons.map((lesson) => [lesson.id, lesson]));
