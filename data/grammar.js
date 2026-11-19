export const grammarLessons = [
  {
    id: 'g1',
    title: '一般现在时 vs 现在进行时',
    en: 'Simple Present vs Present Continuous',
    level: '基础',
    exam: '中考',
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
    keyPoints: [
      'every day、usually、always 提示习惯常态，选一般现在时，三单加 s',
      'now、look、listen 提示正在进行，选 am/is/are 加 doing',
      'every morning 与 today 同句对比，前空一般现在时，后空现在进行时',
      'know、belong、need 等状态动词不用进行时；时刻表用一般现在时',
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
    exam: '中考',
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
    keyPoints: [
      'yesterday、last week、ago 等明确过去时间出现，动词用过去式',
      'already、yet、ever、never、since、for 是现在完成时的标志词',
      'three times 表经历次数、强调对现在的影响，用 have/has 加 done',
      'for 接时间段，since 接时间点或从句，回答 How long 问句常用',
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
    exam: '中考',
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
    keyPoints: [
      'a 还是 an 看读音：an hour、an honest，但 a university',
      '首次提到用 a/an，再次提到、有短语限定或独一无二的事物用 the',
      '最高级和序数词前加 the；三餐、学科、球类运动前用零冠词',
      'life、music 等抽象或不可数名词表泛指时，选不填冠词',
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
    exam: '中考',
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
    keyPoints: [
      '年月季节前用 in，星期和具体日期前用 on，钟点前用 at',
      '某天的上午下午用 on，如 on Sunday morning，不用 in',
      '地点题看关系：空间内部用 in，表面接触用 on，视为一个点用 at',
      'How long 问句答语用 for 加时间段或 since 加起点，配完成时',
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
    exam: '中考',
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
    keyPoints: [
      '主语后跟 of 短语时谓语随中心词：the number of 加复数仍用单数',
      'neither nor、not only but also 连接主语时，谓语就近一致',
      'each、every、everyone、nobody 作主语，谓语一律用单数',
      'team、family 等集合名词强调整体用单数，强调成员用复数',
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
    exam: '中考',
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
    keyPoints: [
      '先行词指人用 who 或 that，指物用 which 或 that，先辨人还是物',
      '空后是名词且与先行词是所属关系，如 car 与 man，选 whose',
      '关系词在从句中作宾语可省略；介词提前后只能用 which 或 whom',
      '逗号隔开的非限制性从句不用 that，补充说明唯一对象要加逗号',
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
    exam: '高考',
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
    keyPoints: [
      '无提示词空后从句成分齐全填 that，缺主语或宾语填 what',
      '主语从句放句首，从句缺宾语填 What 且首字母大写',
      '空后有 or not 或从句在介词后，表是否只能填 whether 不用 if',
      'what 相当于 the thing that，已含先行词，不能再与 that 叠用',
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
    exam: '高考',
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
    keyPoints: [
      '已有谓语且无连词时，提示词动词变非谓语：主动 doing，被动 done',
      '空处表目的填 to do；decide、want、be likely 后固定接 to do',
      'enjoy、avoid、finish 及介词后的提示词动词一律变 doing',
      'be used to 的 to 是介词，后接 doing，语法填空常考此搭配',
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
    exam: '高考',
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
          { en: 'If they had brought a map, they would not have lost their way.', zh: '如果他们当时带了地图，就不会迷路。' },
        ],
      },
      {
        h: 'wish 与 suggest',
        body: 'wish 后接过去式表示与现在相反，接 had done 表示与过去相反。suggest / insist / demand 后的 that 从句常用动词原形。',
        examples: [
          { en: 'I wish I knew the answer.', zh: '我真希望我知道答案。' },
          { en: 'I wish I had taken her advice.', zh: '我真希望当时听了她的建议。' },
          { en: 'The doctor suggested that he rest for a week.', zh: '医生建议他休息一周。' },
        ],
      },
    ],
    keyPoints: [
      '与现在相反：if 从句用过去式，be 一律用 were，主句 would 加原形',
      '主句出现 would have done，从句必填 had done，表与过去相反',
      'wish 后与现在相反用过去式，与过去相反用 had done，看时间词定',
      'suggest、insist、demand 后的 that 从句谓语用动词原形',
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
    exam: '高考',
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
    keyPoints: [
      'Never、Seldom、Hardly、Not only 置句首，助动词提到主语前',
      'Only 加状语放句首才倒装，Only 修饰主语时不倒装，先辨修饰对象',
      '强调句空处填 that：去掉 It is 和 that 后句子仍完整即是强调句',
      '强调句中强调时间地点仍填 that，不填 when 或 where',
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
    exam: '中考',
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
    keyPoints: [
      '看到 than 用比较级：短词加 er，多音节词前加 more',
      '最高级前加 the，后接 in 或 of 范围；one of the 最高级接复数名词',
      '修饰比较级用 much、far、a lot，选项里的 very 不能修饰比较级',
      '倍数放在 as 原级 as 之前，如 three times as big as，语序固定',
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
    exam: '高考',
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
    keyPoints: [
      '前因后果填 therefore；递进填 moreover 或 in addition',
      '空后是名词短语填 despite，是完整句子填 although',
      '无提示词空常考逻辑副词，先判断两句是转折、因果还是递进再选词',
      '作文举例用 for instance 或 such as，such as 后接名词性成分',
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
  {
    id: 'g13',
    title: '被动语态：be + done',
    en: 'The Passive Voice',
    level: '基础',
    exam: '中考',
    mins: 6,
    intro: '把动作的承受者推上主语的位置，就是被动语态。结构只有一副骨架：be + 过去分词，be 负责时态和单复数。',
    sections: [
      {
        h: '一般现在时的被动：am / is / are + done',
        body: '当我们关心“发生了什么”而不关心或不知道“谁做的”，就用被动。主语是复数用 are，第三人称单数用 is；要点名执行者时再用 by 引出。',
        examples: [
          { en: 'English is spoken all over the world.', zh: '全世界都说英语。' },
          { en: 'Our classroom is cleaned every Friday.', zh: '我们的教室每周五打扫。' },
        ],
      },
      {
        h: '一般过去时的被动：was / were + done',
        body: '说过去发生的事，把 be 换成 was / were，其余不变。时间、地点通常放句末，by 短语只在想说清是谁做的时才出现。',
        examples: [
          { en: 'The school sports meeting was held last month.', zh: '学校运动会是上个月举行的。' },
          { en: 'These photos were taken by my uncle in Yunnan.', zh: '这些照片是我叔叔在云南拍的。' },
        ],
      },
      {
        h: '含情态动词的被动：情态动词 + be + done',
        body: '情态动词后面只跟动词原形，所以被动是 must / can / should + be + done。时态和语气信息全在情态动词上，be 不再变化。',
        examples: [
          { en: 'Books must be returned before the end of the month.', zh: '书必须在月底前归还。' },
          { en: 'The problem can be solved in more than one way.', zh: '这个问题可以用不止一种方法解决。' },
        ],
      },
    ],
    keyPoints: [
      '主语是动作承受者就用被动：be 加过去分词，be 随时态和主语变化',
      'last month 等过去时间配 was/were done，主语复数用 were',
      '情态动词后被动是 must/should/can 加 be done，be 不能丢',
      '被动题两步走：先由时间词定 be 的时态，再由主语单复数定 be 形式',
    ],
    pitfall: 'happen、take place 这类不及物动词没有被动语态：不要写 The accident was happened.，应为 The accident happened.',
    quiz: [
      {
        q: 'Paper ____ by Cai Lun about two thousand years ago.',
        opts: ['invented', 'was invented', 'is invented', 'invents'],
        a: 1,
        explain: 'about two thousand years ago 是明确的过去时间，纸是“被发明的”，用一般过去时的被动 was invented。',
      },
      {
        q: 'The windows of our lab ____ once a week.',
        opts: ['clean', 'are cleaned', 'is cleaned', 'were cleaned'],
        a: 1,
        explain: 'once a week 表示习惯，用一般现在时；windows 是复数，又是“被擦”的对象，所以用 are cleaned。',
      },
      {
        q: 'The classroom must ____ before we leave.',
        opts: ['be cleaning', 'cleaned', 'clean', 'be cleaned'],
        a: 3,
        explain: '教室是“被打扫”的，要用被动：情态动词 must 后接 be + 过去分词，即 be cleaned，不能漏掉 be。',
      },
    ],
  },
  {
    id: 'g14',
    title: '情态动词：can / may / must / should',
    en: 'Modal Verbs',
    level: '基础',
    exam: '中考',
    mins: 6,
    intro: '情态动词给句子“调色”：can 讲能力，may 讲许可，must 讲必须，should 讲建议。记住一条铁律：后面只接动词原形。',
    sections: [
      {
        h: '能力与请求：can / could',
        body: 'can 表示“会、能”，could 是它的过去式，也让请求听起来更客气；回答 could 开头的请求时，用 can 就行。',
        examples: [
          { en: 'My sister can ride a bike, but she can’t swim.', zh: '我姐姐会骑自行车，但不会游泳。' },
          { en: 'Could you lend me your dictionary?', zh: '能借我你的词典吗？' },
        ],
      },
      {
        h: '许可与推测：may / might / must',
        body: 'may 表示许可，语气比 can 正式；表示推测时 might 最没把握，must 最有把握。否定的推测不用 mustn’t，而用 can’t。',
        examples: [
          { en: 'May I come in?', zh: '我可以进来吗？' },
          { en: 'You must be hungry after the football match.', zh: '踢完足球你肯定饿了。' },
        ],
      },
      {
        h: '建议与义务：should / must',
        body: 'should 是“应该”，用来提建议；must 是“必须”，口气最强，它的否定 mustn’t 是“禁止”，不是“不必”；外部规定的“不得不”常用 have to。',
        examples: [
          { en: 'You should review your notes before the test.', zh: '考试前你应该复习一下笔记。' },
          { en: 'You mustn’t run in the hallway.', zh: '走廊里禁止奔跑。' },
        ],
      },
    ],
    keyPoints: [
      '有把握的肯定推测用 must be，否定推测用 can\'t be，不用 mustn\'t',
      'Must 开头问句的否定回答用 needn\'t，mustn\'t 表禁止不能作答',
      '提建议选 should；表禁止选 mustn\'t；外部规定的不得不选 have to',
      'could 开头的请求更客气，回答仍用 can；may 表许可比 can 正式',
    ],
    pitfall: '情态动词后直接跟动词原形：He can swims. 错，应为 He can swim；must to go 同样不对，to 也要去掉。',
    quiz: [
      {
        q: 'The library closes at five, and it’s six now. It ____ be open.',
        opts: ['must', 'can’t', 'should', 'need'],
        a: 1,
        explain: '已经闭馆一小时，对“没开门”的否定推测很有把握，用 can’t be；mustn’t 表示禁止，不能用来做推测。',
      },
      {
        q: '“____ I return the book today?” “No, you needn’t. You can keep it until Friday.”',
        opts: ['Must', 'Should', 'Could', 'Would'],
        a: 0,
        explain: 'must 开头的一般疑问句，否定回答用 needn’t，表示“不必”；只有回答“禁止”时才用 mustn’t。',
      },
      {
        q: 'You look pale. You ____ go to see the school doctor.',
        opts: ['should', 'mustn’t', 'can’t', 'needn’t'],
        a: 0,
        explain: '气色不好，给对方提出建议用 should；其余三项分别表示禁止、不能、不必，都不合语境。',
      },
    ],
  },
  {
    id: 'g15',
    title: '条件句：真实与虚拟',
    en: 'Conditionals: Real and Unreal',
    level: '进阶',
    exam: '高考',
    mins: 8,
    intro: '先问一句：这件事有没有可能发生？可能发生的用“主将从现”，与现实相反的才动用虚拟。分清这一步，条件句就完成了一半。',
    sections: [
      {
        h: '真实条件：主将从现',
        body: '表示很可能实现的条件：if 从句用一般现在时，主句用 will / can + 动词原形。虽然说的是将来，if 从句里不能出现 will。',
        examples: [
          { en: 'If you finish your homework early, we can watch a film together.', zh: '如果你早点写完作业，我们可以一起看场电影。' },
          { en: 'If it rains tomorrow, the sports meeting will be put off.', zh: '如果明天下雨，运动会将延期举行。' },
        ],
      },
      {
        h: '与现在相反：过去式 + would do',
        body: '纯属想象、现在做不到的假设：if 从句用一般过去时，be 通常用 were；主句用 would / could + 动词原形。给建议的经典句型 If I were you, ... 就属于这一类。',
        examples: [
          { en: 'If I were you, I would join the school choir.', zh: '如果我是你，我就去参加学校合唱团。（我不是你）' },
          { en: 'If we had a car, we would drive to the seaside this weekend.', zh: '如果我们有车，这个周末就开车去海边。（其实没有车）' },
        ],
      },
      {
        h: '与过去相反：had done + would have done',
        body: '回顾已经发生、无法改变的过去：if 从句用 had + 过去分词，主句用 would have + 过去分词，常带着一点遗憾。',
        examples: [
          { en: 'If you had set an alarm, you wouldn’t have missed the bus.', zh: '如果你当时定了闹钟，就不会错过公交车了。' },
          { en: 'If I had known your number, I would have called you last night.', zh: '要是我早知道你的号码，昨晚就给你打电话了。' },
        ],
      },
    ],
    keyPoints: [
      '主句有 will 且条件可能实现，if 从句填一般现在时，注意三单加 s',
      '主句是 would do，从句填过去式，be 动词不论人称都填 were',
      '主句是 would have done，从句填 had done，谈论无法改变的过去',
      '给 if 从句提示词时，先看主句情态动词形式再定从句时态档位',
    ],
    pitfall: '最典型的错误是从句抢先用将来时：If it will rain tomorrow, ... 错；if 从句用一般现在时 If it rains tomorrow，will 只能出现在主句里。',
    quiz: [
      {
        q: 'If you ____ the last bus, you will have to walk home.',
        opts: ['missed', 'will miss', 'miss', 'would miss'],
        a: 2,
        explain: '真实条件句遵循“主将从现”：主句已经有 will，if 从句要用一般现在时 miss。',
      },
      {
        q: 'If I ____ a bird, I would fly over the sea to watch the sunrise.',
        opts: ['am', 'was', 'were', 'will be'],
        a: 2,
        explain: '与现在事实相反的虚拟，be 动词通常用 were，且不随人称变化。',
      },
      {
        q: 'If he ____ the map, he wouldn’t have got lost in the mountains.',
        opts: ['took', 'had taken', 'would take', 'takes'],
        a: 1,
        explain: '主句是 wouldn’t have got lost，说明在谈与过去相反的假设，从句要用 had + 过去分词。',
      },
    ],
  },
  {
    id: 'g16',
    title: '过去进行时与过去完成时',
    en: 'Past Continuous and Past Perfect',
    level: '进阶',
    exam: '高考',
    mins: 8,
    intro: '一个管“过去那会儿正在进行”，一个管“在那之前早已完成”。把过去想成一条线，这两个时态都藏在线的更深处。',
    sections: [
      {
        h: '过去进行时：过去那一刻正在做',
        body: '结构是 was / were + doing，表示过去某个时刻正在进行、尚未结束的动作，常与 at that time、at eight last night 连用，也常充当被短动作打断的背景。',
        examples: [
          { en: 'At eight last night, I was revising for the math test.', zh: '昨晚八点，我正在为数学考试复习。' },
          { en: 'I was walking past the art room when I heard someone singing.', zh: '我路过美术教室时，听到有人在唱歌。' },
        ],
      },
      {
        h: 'when 与 while 的分工',
        body: 'when 后面的动作可长可短；while 强调一段期间，从句常用进行时。一个短动作打断长背景用 when；两个长动作同时进行、互为背景时，主从句都用过去进行时。',
        examples: [
          { en: 'When the phone rang, she was cooking dinner.', zh: '电话响的时候，她正在做晚饭。' },
          { en: 'While the teacher was writing on the blackboard, we were copying the notes.', zh: '老师在黑板上写字的时候，我们在抄笔记。' },
        ],
      },
      {
        h: '过去完成时：过去的过去',
        body: '结构是 had + 过去分词，表示在过去某个时间点或动作之前就已经完成。它需要一个“过去”作参照点，常与 by the time、before、after 连用。',
        examples: [
          { en: 'By the time I got to school, the first class had begun.', zh: '等我到学校时，第一节课已经开始了。' },
          { en: 'She had finished the report before her boss asked for it.', zh: '老板还没来要，她已经把报告写完了。' },
        ],
      },
    ],
    keyPoints: [
      'at that time 等过去时刻点，提示词动词填 was/were doing',
      'while 从句多用进行时，插入的短暂动作用一般过去时，如 lost',
      'by the time 加过去从句，主句填 had done，表在那之前已完成',
      '读后续写用 was doing 铺背景、when 加短动作推进情节，叙事常用',
    ],
    pitfall: '“过去的过去”别漏掉 had：When I got to the cinema, the film started. 像是到了才开演；写成 had started. 才表示到之前早已开演。',
    quiz: [
      {
        q: 'I ____ my keys while I was leaving the classroom.',
        opts: ['was losing', 'lost', 'had lost', 'lose'],
        a: 1,
        explain: 'lose 是短暂动作，插在 while 引出的进行背景中，用一般过去时 lost；was losing 与短暂动作矛盾。',
      },
      {
        q: 'At nine o’clock last night, my brother ____ model planes for the contest.',
        opts: ['made', 'was making', 'has made', 'had made'],
        a: 1,
        explain: '过去某一时刻正在进行的画面，用过去进行时 was making；made 只说“做过”，没有“当时正做着”的进行感。',
      },
      {
        q: 'When we hurried to the platform, the train ____.',
        opts: ['left', 'has left', 'had left', 'is leaving'],
        a: 2,
        explain: '火车开走在“我们赶到”之前，属于“过去的过去”，用过去完成时 had left。',
      },
    ],
  },
  {
    id: 'g17',
    title: '表达将来：will 与 be going to',
    en: 'Talking About the Future',
    level: '基础',
    exam: '中考',
    mins: 6,
    intro: '说将来不止 will 一个选项：打算好的用 be going to，排进日程的用现在进行时，固定时刻表反而用一般现在时。先想清楚这件事是怎么定下来的。',
    sections: [
      {
        h: 'will：临场决定与预测',
        body: '说话这一刻才做的决定、答应别人做的事和单纯预测，用 will，常缩写成 ’ll。它不带“早就计划好”的意味。',
        examples: [
          { en: 'The box looks heavy. I’ll carry it for you.', zh: '箱子看起来很沉，我来帮你提。（说话时才决定）' },
          { en: 'I think our team will win the match.', zh: '我觉得我们队会赢下这场比赛。' },
        ],
      },
      {
        h: 'be going to：打算与有迹象',
        body: '事先想好的打算用 be going to；有眼前迹象、眼看就要发生的事也用它：看到满天乌云，It’s going to rain.（要下雨了。）',
        examples: [
          { en: 'I’m going to learn swimming this summer holiday.', zh: '这个暑假我打算学游泳。' },
          { en: 'Look at the black clouds. It’s going to rain.', zh: '看那些乌云，要下雨了。' },
        ],
      },
      {
        h: '现在进行时与一般现在时的将来用法',
        body: '已经排定的日程用现在进行时：We are leaving at six.；火车、电影这类固定时刻表用一般现在时：The film starts at seven.',
        examples: [
          { en: 'We are meeting the new exchange student tomorrow morning.', zh: '我们明天上午要接新来的交换生。（日程已定）' },
          { en: 'The museum opens at nine and closes at five.', zh: '博物馆九点开门，五点闭馆。' },
        ],
      },
    ],
    keyPoints: [
      '电话铃响、箱子重等临场决定语境，选 will 加动词原形',
      '事先打算或有乌云等眼前迹象，选 be going to，be 随主语变化',
      '火车电影时刻表用一般现在时表将来，如 starts、opens，三单加 s',
      'be going to 的 be 不能丢：主语 I 用 am，单数主语用 is',
    ],
    pitfall: '已定好的安排别临时改口用 will：被问 What are you doing this weekend?，答 I will visit my grandma. 听起来像当场拍板；说 I’m visiting my grandma. 才是既有安排。',
    quiz: [
      {
        q: 'The phone is ringing. I ____ answer it.',
        opts: ['am going to', 'will', 'am answering', 'answer'],
        a: 1,
        explain: '看到铃响才当场决定去接，属于临场决定，用 will；be going to 表示事先的打算。',
      },
      {
        q: 'Take care! The pile of books ____ fall.',
        opts: ['is going to', 'will', 'falls', 'is falling'],
        a: 0,
        explain: '书堆摇摇欲坠，有明显的眼前迹象，用 be going to 表示眼看就要发生。',
      },
      {
        q: 'The film ____ at 7:20 tonight, so let’s meet at the gate at 7:00.',
        opts: ['will start', 'is going to start', 'starts', 'started'],
        a: 2,
        explain: '电影放映时刻是固定时刻表，用一般现在时 starts 表将来。',
      },
    ],
  },
  {
    id: 'g18',
    title: '宾语从句与间接引语',
    en: 'Object Clauses and Reported Speech',
    level: '进阶',
    exam: '高考',
    mins: 8,
    intro: '把别人的一句话装进自己的句子里当宾语，就是宾语从句。盯住三件事：连接词、陈述语序、时态呼应。',
    sections: [
      {
        h: '连接词：that / if / whether / 疑问词',
        body: '转述陈述句用 that，口语里常省略；转述一般疑问句用 if 或 whether；转述特殊疑问句保留原疑问词。无论哪种，从句一律用陈述语序。',
        examples: [
          { en: 'She said (that) she would join the reading club.', zh: '她说她会加入读书社。' },
          { en: 'I wonder whether the museum is open on Mondays.', zh: '我想知道博物馆周一开不开门。' },
        ],
      },
      {
        h: '时态呼应：主句过去，从句跟着过去',
        body: '主句是过去时，从句一般往后退一步：am / is 变 was，are 变 were，will 变 would，do 变 did。客观真理和自然规律不受此限，仍用一般现在时。',
        examples: [
          { en: 'He told me that he was doing his homework at that moment.', zh: '他告诉我他那时正在写作业。' },
          { en: 'The teacher said that light travels faster than sound.', zh: '老师说光速比声速快。（客观事实，仍用一般现在时）' },
        ],
      },
      {
        h: 'tell / ask 与间接引语',
        body: 'tell 后面必须先接人：tell sb. (that)...；ask 可以接人再接从句，也可以直接接 if / whether 从句。转述时人称和时间状语要换角度：tomorrow 变 the next day，this 变 that。',
        examples: [
          { en: 'Tom asked me if I had seen his pen.', zh: '汤姆问我有没有看见他的钢笔。' },
          { en: 'She said she would call me the next day.', zh: '她说她第二天会给我打电话。（原话：I will call you tomorrow.）' },
        ],
      },
    ],
    keyPoints: [
      '转述一般疑问句填 if 或 whether，空后有 or not 只能填 whether',
      '宾语从句一律陈述语序：疑问词后接主语再接谓语，不倒装',
      '主句过去时从句退一档，但客观真理仍用一般现在时，如光比声快',
      'tell 后先接人再接从句；ask 可直接接 if 或 whether 从句',
    ],
    pitfall: '主句是过去时，从句别用将来时：He said he will come. 错，应为 He said he would come；tomorrow 在转述里也要改成 the next day。',
    quiz: [
      {
        q: 'I want to know ____ she lives near the school or far from it.',
        opts: ['that', 'whether', 'what', 'which'],
        a: 1,
        explain: '句末有 or not，表示“是否”要用 whether；that 不表疑问，what、which 与句意不符。',
      },
      {
        q: 'Do you know ____?',
        opts: ['when will the meeting begin', 'when the meeting will begin', 'when begins the meeting', 'when did the meeting begin'],
        a: 1,
        explain: '宾语从句必须用陈述语序：疑问词 + 主语 + 谓语，所以是 when the meeting will begin。',
      },
      {
        q: 'Lily said she ____ her uncle in Beijing the next day.',
        opts: ['will visit', 'visited', 'would visit', 'visits'],
        a: 2,
        explain: '主句是过去时 said，转述将来的事要把 will 后移为 would；the next day 也提示这是转述口吻。',
      },
    ],
  },
  {
    id: 'g19',
    title: '动名词还是不定式',
    en: 'Gerund or Infinitive',
    level: '进阶',
    exam: '高考',
    mins: 7,
    intro: '动词后面跟 doing 还是 to do，不是随机的：有的动词只认一个，有的换形式就换意思。先记住最常用的那几个“死规矩”。',
    sections: [
      {
        h: '只接 doing 的动词',
        body: 'enjoy、finish、mind、practice、keep、suggest 后面只接 doing；介词后面的动词也一律用 doing，如 be good at swimming、instead of waiting。',
        examples: [
          { en: 'Would you mind opening the window?', zh: '你介意把窗户打开吗？' },
          { en: 'He kept practicing the violin even during the holiday.', zh: '即使在假期，他也坚持练小提琴。' },
        ],
      },
      {
        h: '只接 to do 的动词',
        body: 'decide、hope、want、plan、refuse、agree、promise 后面接 to do，指向还没发生、想要去做的事。',
        examples: [
          { en: 'We agreed to meet at the school gate at five.', zh: '我们约好五点在校门口碰面。' },
          { en: 'She hopes to study medicine at university.', zh: '她希望上大学后学医。' },
        ],
      },
      {
        h: '双面动词：形式一换，意思就变',
        body: 'remember / forget + to do 指“还没做、要去做”，+ doing 指“已做过”；stop to do 是停下来去做另一件事，stop doing 是停止正在做的事；try to do 是努力设法，try doing 是试着换个办法。',
        examples: [
          { en: 'Remember to lock the door when you leave.', zh: '走的时候记得锁门。（还没锁）' },
          { en: 'I remember locking the door, but it was wide open.', zh: '我记得锁过门了，可门却大开着。（已锁过）' },
        ],
      },
    ],
    keyPoints: [
      'enjoy、mind、practice、keep 后接 doing，语法填空直接变 ing',
      'decide、hope、plan、promise 后接 to do，指向未发生的事',
      '介词后动词一律变 doing，如 be good at 或 instead of 后',
      'remember to do 是还没做，remember doing 是已做过，按语境选',
    ],
    pitfall: 'stop 后面差一个 to，意思就反了：He stopped to smoke. 是“停下来去抽烟”，He stopped smoking. 才是“不抽了”。',
    quiz: [
      {
        q: 'My grandfather enjoys ____ stories about his childhood.',
        opts: ['to tell', 'telling', 'tell', 'told'],
        a: 1,
        explain: 'enjoy 后只能接动名词：enjoy doing sth. 表示“乐于做某事”。',
      },
      {
        q: 'The classroom is a mess. We decided ____ it right away.',
        opts: ['cleaning', 'clean', 'to clean', 'cleaned'],
        a: 2,
        explain: 'decide 后接 to do，表示“决定去做”还没发生的事。',
      },
      {
        q: 'He was tired after the long run, so he stopped ____ a rest.',
        opts: ['to have', 'having', 'have', 'had'],
        a: 0,
        explain: 'stop to do 指“停下来去做另一件事”：停下脚步歇一会儿；stop having 则成了“停止休息”，不合语境。',
      },
    ],
  },
  {
    id: 'g20',
    title: '状语从句与让步',
    en: 'Adverbial Clauses and Concession',
    level: '高阶',
    exam: '高考',
    mins: 8,
    intro: '状语从句给主句补上时间、结果、让步这些背景。写对的关键只有一条：连接词后面必须接完整的句子，除非它本来就不是连词。',
    sections: [
      {
        h: '时间：when / while / as',
        body: 'when 后的动作可长可短；while 强调一段时间，从句常用进行时；as 表示“一边……一边”或“随着”，强调两个动作同步变化。',
        examples: [
          { en: 'As we climbed higher, the air became cooler.', zh: '我们越往上爬，空气越凉爽。' },
          { en: 'While Dad was mowing the lawn, Mom was watering the roses.', zh: '爸爸修剪草坪的时候，妈妈在给玫瑰花浇水。' },
        ],
      },
      {
        h: '结果：so ... that 与 such ... that',
        body: 'so + 形容词 / 副词 + that，such + 名词短语 + that，都表示“如此……以至于”。so many / so much 后接名词是固定搭配；such a 只用于可数名词单数。',
        examples: [
          { en: 'The box was so heavy that I could hardly lift it.', zh: '这箱子重得我几乎搬不动。' },
          { en: 'It was such an exciting game that nobody left early.', zh: '比赛太精彩了，没有人提前离场。' },
        ],
      },
      {
        h: '让步：although / even if / despite',
        body: 'although、though、even though、even if 后面接完整句子，不与 but 连用；despite 和 in spite of 是介词，后面只能接名词、代词或 doing。',
        examples: [
          { en: 'Even if the ticket costs more, I will take the direct train.', zh: '就算票价贵一些，我也要坐直达火车。' },
          { en: 'Despite the heavy rain, the football match went on.', zh: '尽管雨下得很大，足球赛照常进行。' },
        ],
      },
    ],
    keyPoints: [
      'so 后接形容词副词，such 后接名词短语；such a 只用于可数单数',
      '空后是完整句子填 even though，是名词短语填 despite',
      'as 表随着，两动作同步变化，如越爬越高空气越凉，完形常考此义',
      'so many、so much 加名词是固定搭配，此时不用 such',
    ],
    pitfall: 'although 和 but 不能同时出现：Although he was tired, but he kept running. 错；让步从句本身已含转折，去掉 but 即可。',
    quiz: [
      {
        q: '____ he was the youngest player in the team, he played the best.',
        opts: ['Because', 'Although', 'If', 'So'],
        a: 1,
        explain: '“年纪最小”与“打得最好”之间是让步转折，用 Although 引导；Because 表原因，逻辑不通。',
      },
      {
        q: 'It was ____ surprising news that everyone kept talking about it.',
        opts: ['so', 'such', 'so a', 'such a'],
        a: 1,
        explain: 'news 是不可数名词，用 such 修饰名词短语 such surprising news；such a 只用于可数名词单数。',
      },
      {
        q: '____ the road was covered with snow, the postman still arrived on time.',
        opts: ['Because of', 'Despite', 'Even though', 'As'],
        a: 2,
        explain: 'the road was covered with snow 是完整句子，让步用 Even though；Despite 和 Because of 是介词，后面不能接句子，As 表原因不合句意。',
      },
    ],
  },
  {
    id: 'g21',
    title: '疑问句：一般疑问与特殊疑问的语序',
    en: 'Questions: Yes/No Forms and Wh- Word Order',
    level: '基础',
    exam: '中考',
    mins: 6,
    intro: '疑问句只看一件事：疑问词或助动词站在句首之后，剩下的还要不要倒装。先判断你在问主语，还是问动作的对象。',
    sections: [
      {
        h: '一般疑问句：把 be 或助动词搬到主语前面',
        body: '先看句子里有没有 be 动词或助动词：有就直接提前，没有就请 do / does / did 帮忙。用了 did，后面的动词要回到原形。回答用 Yes, 主语 + 助动词或 No, 主语 + 助动词 + not，不把整个句子重复一遍。',
        examples: [
          { en: 'Are you ready for the maths test?', zh: '你准备好数学测验了吗？' },
          { en: 'Does your brother work in a hospital?', zh: '你哥哥在医院工作吗？' },
        ],
      },
      {
        h: '特殊疑问句：疑问词 + 一般疑问句语序',
        body: 'what / where / when / why / how / who / whose 放句首，后面照搬一般疑问句的倒装：疑问词 + 助动词 + 主语 + 动词。先想清楚问的是时间、地点、原因还是方式，再根据时间标志词决定用哪个助动词。',
        examples: [
          { en: 'Why were you late for the morning reading?', zh: '你晨读为什么迟到了？' },
          { en: 'How did she learn to make dumplings?', zh: '她是怎么学会包饺子的？' },
        ],
      },
      {
        h: '疑问词作主语时，不倒装',
        body: '当 who / what / whose / which 自己就是主语或主语的定语，句子按陈述语序排：疑问词 + 动词 + 其余成分。判断方法是把答案放回主语位置，若能说通，说明问的是主语，不要再加 do。',
        examples: [
          { en: 'Who broke the window of the lab?', zh: '谁把实验室的窗户打破了？' },
          { en: 'What makes the sky look orange at sunset?', zh: '是什么让日落时的天空看起来发橙？' },
        ],
      },
    ],
    keyPoints: [
      '主语三单且谓语是实义动词，句首借 Does；过去时间借 Did，动词回原形',
      '答语是 almost every night 等频率，疑问词选 how often',
      '两者范围内选择用 which 不用 what，which 可作主语',
      '简答用 Yes 或 No 加主语和助动词，助动词与问句保持一致',
    ],
    pitfall: '两种语序最容易用反：问宾语时忘了倒装，写成 What you bought yesterday?，应是 What did you buy yesterday?；问主语时又硬加助动词，写成 Who did break the window?，正常问法是 Who broke the window?',
    quiz: [
      {
        q: '____ your cousin live in Suzhou?',
        opts: ['Does', 'Do', 'Is', 'Are'],
        a: 0,
        explain: '主语 your cousin 是第三人称单数，实义动词 live 前需要助动词 does 提到句首。',
      },
      {
        q: 'Which of the following is a correct question?',
        opts: ['Where you bought that scarf?', 'Where did you buy that scarf?', 'Where do you buy that scarf?', 'Where bought you that scarf?'],
        a: 1,
        explain: '疑问词作宾语时要倒装：疑问词 + 助动词 did + 主语 + 动词原形。',
      },
      {
        q: '— ____ in the box? — Nothing but some old coins.',
        opts: ['What does', 'What is', 'What are', 'What do'],
        a: 1,
        explain: 'what 在这里问的是主语，用陈述语序 What is，不需要助动词 do。',
      },
      {
        q: '— ____ you see the fireworks last Saturday? — No, but I watched the video online.',
        opts: ['Were', 'Did', 'Do', 'Have'],
        a: 1,
        explain: 'last Saturday 是明确的过去时间，借助动词 did 提问，后面的 see 保持原形。',
      },
      {
        q: '— ____ of the two plans sounds more practical? — The first one, I think.',
        opts: ['What', 'Who', 'Which', 'How'],
        a: 2,
        explain: '在两者之中做选择用 which，which 作主语，后面直接接动词 sounds。',
      },
      {
        q: '— How ____ do you write in your English diary? — Almost every night.',
        opts: ['many', 'much', 'often', 'far'],
        a: 2,
        explain: '回答 every night 说的是频率，所以问句用 how often。',
      },
    ],
  },
  {
    id: 'g22',
    title: '反意疑问句：前肯后否的尾巴',
    en: 'Question Tags',
    level: '基础',
    exam: '中考',
    mins: 6,
    intro: '反意疑问句就是把句子切成两半：前面陈述，后面小声确认。助动词照抄前面，否定只放在其中一半。',
    sections: [
      {
        h: '基本口诀：前肯后否，主语换成代词',
        body: '陈述部分肯定，尾巴就用否定。用哪个助动词、哪个时态，照抄陈述部分；主语换成 he / she / it / they 这类代词。谓语是实义动词时借 do / does / did，是 be 或情态动词时直接把它们提前。',
        examples: [
          { en: 'Lily can speak a little French, can’t she?', zh: '莉莉会说一点法语，不是吗？' },
          { en: 'The twins visited the science museum yesterday, didn’t they?', zh: '这对双胞胎昨天参观了科学博物馆，对吧？' },
        ],
      },
      {
        h: '句子里有否定词，尾巴就变肯定',
        body: 'never、seldom、hardly、hardly ever、few、little、no one 这些词已经把意思否定过一次，所以尾巴要用肯定形式。判断时先找这些半否定词，再看主语和时态，别被中文的“很少”骗过去。',
        examples: [
          { en: 'There is little meat left in the fridge, is there?', zh: '冰箱里几乎没剩什么肉了，是吗？' },
          { en: 'He has never tried hot and spicy noodles, has he?', zh: '他从来没吃过麻辣面，是吗？' },
        ],
      },
      {
        h: '几种必须背下来的特殊尾巴',
        body: '祈使句后面通常接 will you?，表示请对方做某事，否定的祈使句同样用 will you。Let’s 开头说“咱们一起做”，接 shall we?；Let me 或 Let him 不包括听话人，仍用 will you。This is / That is 作主语时用 isn’t it，I am 后面用 aren’t I。',
        examples: [
          { en: 'Let’s tidy the reading room after school, shall we?', zh: '放学后我们把阅览室整理一下，好吗？' },
          { en: 'Don’t forget to lock the bike, will you?', zh: '别忘了锁自行车，好吗？' },
        ],
      },
    ],
    keyPoints: [
      '前肯后否前否后肯，尾巴助动词照抄前句时态，主语换成代词',
      '句中有 never、hardly、few、little 等否定词，尾巴用肯定形式',
      '祈使句尾巴用 will you，Let\'s 开头用 shall we，是固定搭配',
      'I am 的尾巴是 aren\'t I，This is 作主语用 isn\'t it，需单独记',
    ],
    pitfall: '回答前否后肯的反意疑问句时，Yes 和 No 按事实说，不按对方的口气说：You didn’t finish the report, did you? 确实没写完要答 No, I didn’t，其实写完了要答 Yes, I did。中文的“是的/不是”在这里最容易翻错。',
    quiz: [
      {
        q: 'Your grandparents took a long walk in the park after supper, ____?',
        opts: ['did they', 'don’t they', 'didn’t they', 'do they'],
        a: 2,
        explain: '前面是肯定的一般过去时，尾巴用否定 didn’t，主语换成 they。',
      },
      {
        q: 'Tom hardly ever watches the news on TV, ____?',
        opts: ['does he', 'doesn’t he', 'is he', 'isn’t he'],
        a: 0,
        explain: 'hardly ever 已含否定，尾巴用肯定；谓语是实义动词 watches，所以借 does。',
      },
      {
        q: 'Let’s go cycling along the river this Saturday, ____?',
        opts: ['will you', 'shall we', 'shall you', 'won’t you'],
        a: 1,
        explain: 'Let’s 包括听话人一起做事，固定用 shall we。',
      },
      {
        q: 'I am a little late for the meeting, ____?',
        opts: ['am I', 'aren’t I', 'isn’t I', 'don’t I'],
        a: 1,
        explain: 'I am 的否定尾巴只能用 aren’t I，这是固定的例外。',
      },
      {
        q: 'Pass me the salt from the table, ____?',
        opts: ['shall we', 'do you', 'will you', 'won’t you'],
        a: 2,
        explain: '肯定祈使句请对方做事，尾巴用 will you。',
      },
      {
        q: '— You didn’t break the glass, did you? — ____. The cat did it.',
        opts: ['Yes, I didn’t', 'No, I didn’t', 'Yes, I did', 'No, I did'],
        a: 1,
        explain: '事实是“我没打碎”，按事实答 No，且 No 后面要跟否定形式 didn’t。',
      },
    ],
  },
  {
    id: 'g23',
    title: '祈使句与感叹句',
    en: 'Imperatives and Exclamations',
    level: '基础',
    exam: '中考',
    mins: 6,
    intro: '祈使句从动词原形开始，感叹句只看一个位置：感叹词后面紧跟的是名词还是形容词。',
    sections: [
      {
        h: '祈使句：动词原形开头，否定用 Don’t',
        body: '表请求、命令、提醒时，句子从动词原形开始，主语 you 一般省掉。否定用 Don’t + 动词原形，语气更重时可用 Never。想客气一点就加 please，放句首或句末都可以，后面的结构不变。',
        examples: [
          { en: 'Please turn off the lights when you leave the lab.', zh: '离开实验室时请把灯关掉。' },
          { en: 'Don’t run in the hallway between classes.', zh: '课间不要在走廊里跑。' },
        ],
      },
      {
        h: 'Let 家族与“祈使句 + and / or”',
        body: 'Let’s + 动词原形说“咱们一起做”，包括听话人；Let me 或 Let him 做的事与听话人无关。and 连接好结果，or 相当于“否则、不然”，前面仍是动词原形开头的祈使句。',
        examples: [
          { en: 'Let’s ask the guide for a ten-minute break.', zh: '我们跟导游申请休息十分钟吧。' },
          { en: 'Put your coat on, or you will catch a cold out there.', zh: '把外套穿上，不然在外面会着凉的。' },
        ],
      },
      {
        h: '感叹句：What 管名词，How 管形容词或副词',
        body: '看紧跟在感叹词后面的那个成分：是名词短语就用 What，可数名词单数要带 a / an，不可数和复数不带冠词；是形容词或副词就用 How。后面再补上主语和谓语，也可以省略只留半句。',
        examples: [
          { en: 'What a wonderful concert it was!', zh: '那是一场多么精彩的音乐会啊！' },
          { en: 'How quickly the children are growing!', zh: '孩子们长得真快啊！' },
        ],
      },
    ],
    keyPoints: [
      '祈使句加 and 接好结果，加 or 接否则，句首一律用动词原形',
      '否定祈使句用 Don\'t 加原形，句首填 Don\'t 而非 Not 或 No',
      'What a 用于可数单数，元音音素前用 What an，如 amazing story',
      'Let 加宾语加原形表让某人做，Let\'s 包括听话人，按句意区分',
    ],
    pitfall: '选 What 还是 How，看形容词后面还有没有名词：有名词用 What，形容词自己收尾用 How。所以是 What delicious food it is!（food 是不可数名词，不加 a），却是 How delicious the food is!',
    quiz: [
      {
        q: '____ more vegetables and fruit, and you will feel better soon.',
        opts: ['To eat', 'Eat', 'Eating', 'Eaten'],
        a: 1,
        explain: '祈使句 + and + 陈述句，开头要用动词原形 Eat。',
      },
      {
        q: '____ swim in the river alone, or you may get into real danger.',
        opts: ['Not to', 'No', 'Don’t', 'Not'],
        a: 2,
        explain: '否定祈使句用 Don’t + 动词原形，or 后面说明后果。',
      },
      {
        q: '____ amazing story about a lost dog it is!',
        opts: ['What', 'What an', 'How', 'What a'],
        a: 1,
        explain: '核心是名词 story，可数单数前要加冠词，amazing 以元音音素开头，用 What an。',
      },
      {
        q: '____ excited the young fans were when the singer came out!',
        opts: ['What', 'What an', 'How', 'Such'],
        a: 2,
        explain: 'excited 是形容词且后面没有名词，用 How + 形容词 + 主语 + 谓语。',
      },
      {
        q: '____ delicious food the cook prepared for the whole class!',
        opts: ['What', 'What a', 'How', 'How a'],
        a: 0,
        explain: 'food 是不可数名词，用 What 直接修饰名词短语，不能加 a。',
      },
      {
        q: '____ your little sister cross the road first; she is only four.',
        opts: ['Let’s', 'Let', 'To let', 'Lets'],
        a: 1,
        explain: '这里是 Let + 宾语 + 动词原形，让某人做某事；Let’s 等于 Let us，意思不符。',
      },
    ],
  },
  {
    id: 'g24',
    title: '代词：some / any / one / both 的分工',
    en: 'Pronouns: Some, Any, One, Both',
    level: '基础',
    exam: '中考',
    mins: 7,
    intro: '代词题先问两句：范围是两个还是三个以上？指的是同一个东西还是同类里的另一个？',
    sections: [
      {
        h: 'some 与 any：不只看肯定和否定',
        body: '常规是肯定句用 some，否定句和疑问句用 any。两条常见例外：请求、建议、希望对方答“好”时，问句也用 some；any 在否定句里表示“任何一个”，比 no + 名词更简洁。somebody / anything 这类复合代词，修饰词 else 要后置。',
        examples: [
          { en: 'Would you like some hot water first?', zh: '你要不要先来点热水？' },
          { en: 'I didn’t see anybody waiting outside.', zh: '我没看到任何人在外面等。' },
        ],
      },
      {
        h: 'one / it / that / those：到底指哪一个',
        body: 'it 指前面提到过的同一个东西，one 指同一类里的另一个，即同类不同物。比较句里为避免重复，that 代替前面的单数或不可数名词，those 代替复数名词。one 前面还能再加形容词，构成 a new one。',
        examples: [
          { en: 'My umbrella is broken, so I need to buy a new one.', zh: '我的伞坏了，得买把新的。' },
          { en: 'The traffic in Tokyo is heavier than that in my city.', zh: '东京的交通比我们的城市更堵。' },
        ],
      },
      {
        h: 'both / either / neither 与 all / none / everything',
        body: '两者范围用 both（都）、either（任一个）、neither（都不）；三者以上用 all、any、none。both 作主语用复数谓语，neither of、each of、every 一类用单数谓语。nothing、everything 等复合不定代词作主语时谓语也用单数。',
        examples: [
          { en: 'Neither of my two cousins likes getting up early.', zh: '我的两个表弟都不喜欢早起。' },
          { en: 'Everything in the kitchen smells wonderful.', zh: '厨房里的一切闻起来都很香。' },
        ],
      },
    ],
    keyPoints: [
      'Would you like 等招待建议问句用 some，普通疑问否定句用 any',
      '比较句中代替前面单数或不可数名词用 that，代替复数用 those',
      '两者都不用 neither，三者以上都不用 none，先数范围再选词',
      'else 放在复合不定代词之后，如 anything else，语序固定',
    ],
    pitfall: 'one 和 it 常被换着用：I lost my dictionary. I bought it again. 逻辑不通，因为原来那本并没有回来，要说 I bought a new one。另外 every、each、everyone 之后的动词一律用单数：Everyone has a ticket.',
    quiz: [
      {
        q: '— Is there ____ milk left in the bottle? — No, but we can buy some now.',
        opts: ['some', 'any', 'no', 'many'],
        a: 1,
        explain: '普通疑问句用 any；milk 不可数，所以不能用 many。',
      },
      {
        q: '— Would you like ____ tea? — Yes, please. It is cold outside.',
        opts: ['any', 'some', 'many', 'few'],
        a: 1,
        explain: '表示招待、建议并期待对方接受时，疑问句里用 some。',
      },
      {
        q: 'I have lost my umbrella, so I need to buy a new ____.',
        opts: ['it', 'that', 'one', 'this'],
        a: 2,
        explain: '要买的是同一类里的另一把伞，用 one 代替 umbrella；it 指原来那把。',
      },
      {
        q: 'The weather in Sanya is much warmer than ____ in Harbin in winter.',
        opts: ['one', 'those', 'that', 'it'],
        a: 2,
        explain: '比较的是同一个不可数名词 weather，用 that 避免重复；those 只代替复数。',
      },
      {
        q: '— Which of the two books did you read? — ____. I returned both to the library unread.',
        opts: ['Neither', 'Both', 'Either', 'None'],
        a: 0,
        explain: '两本都没读，两者全否定用 Neither；None 用于三个以上。',
      },
      {
        q: '— Is there ____ in the schoolbag? — Yes, an old dictionary and some cards.',
        opts: ['anything else', 'else anything', 'something else', 'nothing else'],
        a: 0,
        explain: '疑问句用 anything，且 else 要放在复合不定代词之后：anything else。',
      },
    ],
  },
  {
    id: 'g25',
    title: '数词：基数、序数、分数与时间',
    en: 'Numbers, Fractions and Time',
    level: '基础',
    exam: '中考',
    mins: 7,
    intro: '数词的坑集中在两处：拼写变化和主谓一致。数字本身不决定动词，后面的名词才决定。',
    sections: [
      {
        h: '基数变序数：拼写有三处坑',
        body: '序数词一般在基数后加 -th，但 one 变 first、two 变 second、three 变 third 要整体换形；five 变 fifth、twelve 变 twelfth 要改字母；整十词的 -y 变 -ieth。几十几变序数时只变最后一个个位。序数前通常加 the，表示顺序或日期。',
        examples: [
          { en: 'My piano class is on the fifth floor, not the ninth.', zh: '我的钢琴课在五楼，不是九楼。' },
          { en: 'He was the third student to hand in the paper.', zh: '他是第三个交卷的学生。' },
        ],
      },
      {
        h: '分数与百分数：分子基数，分母序数',
        body: '分子用基数词，分母用序数词；分子大于一时，分母加 s，如 two thirds。分数或百分数后面接 of + 名词时，谓语的单复数看 of 后面的名词，不看数字本身。',
        examples: [
          { en: 'Two thirds of the students in our class are girls.', zh: '我们班三分之二的学生是女生。' },
          { en: 'Only ten percent of the water in the lake is clean.', zh: '湖里只有百分之十的水是干净的。' },
        ],
      },
      {
        h: '时间、日期与 hundred 的用法限制',
        body: '具体数字后的 hundred、thousand、million 不加 s、不接 of，说 two hundred students；表示不确定的“好几百”才用 hundreds of。整点用 o’clock，半点用 half past，刻钟用 a quarter past 或 a quarter to。英式日期读 the twenty-fifth of May，美式读 May the twenty-fifth；一段路程用复数所有格 ten minutes’ walk。',
        examples: [
          { en: 'About two thousand visitors came to the show last Saturday.', zh: '上周六大约有两千名观众来看演出。' },
          { en: 'It is about ten minutes’ walk from my home to the school gate.', zh: '从我家到学校大门大约步行十分钟。' },
        ],
      },
    ],
    keyPoints: [
      'nine 变 ninth 保留 e，five 变 fifth，整十词 y 变 ieth',
      '分数分子用基数分母用序数，分子大于一分母加 s，如 two thirds',
      '几十几变序数只变个位：the twenty-fifth of May，日期必用序数',
      'half past 表半点，a quarter to 表差一刻，钟点表达是单选常客',
    ],
    pitfall: '具体数字后加 s 是最典型的错：two hundreds students 要说 two hundred students；反过来，hundreds of 前面不能再放具体数字，不写 two hundreds of people。分数题的谓语要跟 of 后面的名词走：Two thirds of the cake was eaten.',
    quiz: [
      {
        q: 'September is the ____ month of the year, when the new term begins.',
        opts: ['nine', 'ninth', 'ninety', 'nineth'],
        a: 1,
        explain: '序数词 ninth 直接在 nine 后加 th，不去 e；月份前用 the。',
      },
      {
        q: 'Hurry up! It is ____ eight already, and the film has been on for a while.',
        opts: ['past half', 'half past', 'to half', 'half to'],
        a: 1,
        explain: '半点用 half past + 钟点，half past eight 是八点半。',
      },
      {
        q: '____ of the teachers in our school are under thirty-five years old.',
        opts: ['Two third', 'Second three', 'Two thirds', 'Thirds two'],
        a: 2,
        explain: '分子基数 two，分母序数且大于一要加 s，成为 two thirds；谓语随 teachers 用复数。',
      },
      {
        q: 'Sixty percent of the electricity in this building ____ from the wind farm at the port.',
        opts: ['come', 'comes', 'are coming', 'is come'],
        a: 1,
        explain: 'percent of 后的 electricity 是不可数名词，谓语用单数 comes。',
      },
      {
        q: '— How many people came to the science talk yesterday? — About ____.',
        opts: ['hundred of', 'two hundred', 'two hundreds', 'two hundreds of'],
        a: 1,
        explain: '有具体数字时 hundred 不加 s、也不接 of，答 About two hundred。',
      },
      {
        q: '— When is the school leavers’ party? — It is on ____.',
        opts: ['the twenty-five of May', 'May the twenty-five', 'the twenty-fifth of May', 'twenty-fifth May'],
        a: 2,
        explain: '日期要用序数，且几十几只变个位：the twenty-fifth of May。',
      },
    ],
  },
  {
    id: 'g26',
    title: 'There be 句型与存现句',
    en: 'There Be and Existential Sentences',
    level: '基础',
    exam: '中考',
    mins: 6,
    intro: 'There be 的真主语在后面，所以动词的单复数、时态和尾巴都跟着后面那个最近的名词走。',
    sections: [
      {
        h: '就近原则：be 跟着最近的名词',
        body: 'There be 表示“某处有某物”，there 只是引导词，没有实义。后面并列几个主语时，离 be 最近的那个名词决定单复数，这就是就近原则，不是把总数加起来算。',
        examples: [
          { en: 'There is a map of China and two posters on the wall.', zh: '墙上有一张中国地图和两张海报。' },
          { en: 'There are two posters and a map of China on the wall.', zh: '墙上有两张海报和一张中国地图。' },
        ],
      },
      {
        h: '时态全部压在 be 上',
        body: '过去、将来、完成都靠变化 be：There was / were、There will be、There is going to be、There has been；有情态动词时用 must be、may be。表“有”时不能用 have，中文“那里有一个”很容易被直译成 There has。',
        examples: [
          { en: 'There will be a football match between Class One and Class Two next Friday.', zh: '下周五一班和二班之间将有一场足球赛。' },
          { en: 'There is going to be a parents’ meeting this evening.', zh: '今晚要开一次家长会。' },
        ],
      },
      {
        h: '疑问、否定与反意疑问仍用 there',
        body: '提问时把 be 提到 there 前面：Are there any…? Is there a…? 否定在 be 后加 not，或用 no + 名词。反意疑问的尾巴继续用 there，不能换成 it；陈述部分出现 nothing、no one、little 这类否定含义词时，尾巴用肯定。',
        examples: [
          { en: 'Are there any empty seats near the window?', zh: '靠窗还有空座位吗？' },
          { en: 'There was only one ticket left, wasn’t there?', zh: '只剩一张票了，不是吗？' },
        ],
      },
    ],
    keyPoints: [
      '表某处有用 There be 不用 have，将来时是 There will be',
      '时间词决定 be 的形式：过去用 was/were，将来用 will be',
      '疑问句 be 提到 there 前，如 Are there；否定在 be 后加 not',
      '句中有 nothing、no one 等否定词时，反意疑问尾巴用肯定形式',
    ],
    pitfall: '接“单数 + 复数”时别按整句的总数选动词，要看离 be 最近的那个名词：There is a pen and two exercise books on the desk. 另外尾巴不能用 it，There is nothing in the room, isn’t it? 是错的，应写成 is there?',
    quiz: [
      {
        q: '— What is in your schoolbag? — ____ a dictionary and three picture books.',
        opts: ['There are', 'There is', 'There have', 'It is'],
        a: 1,
        explain: '就近原则看最近的名词 a dictionary，是单数，所以用 There is。',
      },
      {
        q: '— What is in your schoolbag? — ____ three picture books and a dictionary.',
        opts: ['They are', 'There is', 'There have', 'There are'],
        a: 3,
        explain: '这次离 be 最近的是复数 three picture books，所以用 There are。',
      },
      {
        q: '— ____ any empty seats near the stage? — Yes, there are two.',
        opts: ['Are there', 'Is there', 'There are', 'Have there'],
        a: 0,
        explain: '疑问句把 be 提到 there 前；seats 是复数，用 Are there。',
      },
      {
        q: 'There ____ a speech contest in the hall next Monday afternoon.',
        opts: ['will be', 'will have', 'is going to have', 'are'],
        a: 0,
        explain: '存现句的将来时用 There will be，不能用 have 表示“有”。',
      },
      {
        q: 'There is nothing left in the fridge for dinner, ____?',
        opts: ['isn’t it', 'is there', 'isn’t there', 'was there'],
        a: 1,
        explain: 'nothing 已表否定，尾巴用肯定，且主语位置仍保留 there。',
      },
      {
        q: 'Long long ago there ____ a small fishing village by the river.',
        opts: ['had', 'is', 'were', 'was'],
        a: 3,
        explain: '故事开头讲过去，真正的主语 a small fishing village 是单数，用 was。',
      },
    ],
  },
  {
    id: 'g27',
    title: '并列句：and / but / or / so 与关联连词',
    en: 'Coordinate Clauses and Paired Conjunctions',
    level: '进阶',
    exam: '中考',
    mins: 7,
    intro: '并列句先看两个句子的关系，再选连词；连词决定不了的事，主谓一致由离动词最近的主语决定。',
    sections: [
      {
        h: '四个连词各管一种关系',
        body: 'and 表顺承或并列，but 表转折，or 表选择或“否则”，so 表结果。or 在“命令 + 后果”里最常用，中文的“不然”就是 or。两个完整句子之间要加逗号，再写连词，动词各自保留。',
        examples: [
          { en: 'I asked Tom to dinner, but he had already made other plans.', zh: '我请 Tom 吃晚饭，但他已经另有安排了。' },
          { en: 'Write your name on the back, or the drawing will be lost among others.', zh: '把名字写在背面，不然这幅画会在别人的画里弄丢。' },
        ],
      },
      {
        h: '关联连词与主谓一致',
        body: 'both…and 连接两个主语时谓语用复数，因为说的是两个人或两样东西。either…or、neither…nor、not only…but also 按就近原则，谓语跟着离它最近的那个主语走。连词要成对出现，连接的两个部分词性也要对等。',
        examples: [
          { en: 'Both his parents and his elder sister work in the same city.', zh: '他父母和姐姐都在同一个城市工作。' },
          { en: 'Not only the twins but also their mother is interested in street photography.', zh: '不仅那对双胞胎，他们的妈妈也对街头摄影感兴趣。' },
        ],
      },
      {
        h: '并列句动笔前的三个检查',
        body: '一是形式对称：and 前后同为动词原形、同为不定式或同为完整句子。二是时态呼应：后半句说过去，前半句的时间线索也要一致。三是不要只用逗号硬拼两个句子，必须带上连词。',
        examples: [
          { en: 'My mother asked me to wash the vegetables and set the table.', zh: '妈妈让我洗菜并且摆好餐桌。' },
          { en: 'She closed the door quietly and sat down beside me.', zh: '她轻轻关上门，在我旁边坐下。' },
        ],
      },
    ],
    keyPoints: [
      '祈使句后 or 表否则 and 表好结果，转折用 but，结果用 so',
      'both and 连接主语谓语用复数，neither nor 按就近原则定单复数',
      'and 前后形式对称：同为原形、同为不定式或同为完整句子',
      '两个完整句子之间必须有连词，只用逗号拼接是作文常见扣分点',
    ],
    pitfall: '中文的“因为……所以……”“虽然……但是……”在英文里只能留一个：Because it was raining, so we stayed at home. 要改成 It was raining, so we stayed at home. 或 Because it was raining, we stayed at home.',
    quiz: [
      {
        q: 'Hurry up, ____ you will miss the early bus to the museum.',
        opts: ['and', 'or', 'so', 'but'],
        a: 1,
        explain: '祈使句 + or + 后果，or 表示“否则、不然”。',
      },
      {
        q: 'I asked Tom to join us for dinner, ____ he had already made other plans.',
        opts: ['but', 'and', 'or', 'so'],
        a: 0,
        explain: '前一句的邀请与后一句的已有安排是转折关系，用 but。',
      },
      {
        q: 'Neither of my cousins ____ the film, so we talked about something else on the way home.',
        opts: ['like', 'likes', 'liked', 'are liking'],
        a: 2,
        explain: 'so 后面的 talked 说明整句讲过去，neither of 的谓语也照过去时写 liked。',
      },
      {
        q: 'Not only the twins but also their mother ____ coming to the open day.',
        opts: ['are', 'is', 'were', 'have'],
        a: 1,
        explain: 'not only…but also 用就近原则，最近的主语 their mother 是单数，用 is。',
      },
      {
        q: '____ my father ____ my mother is a doctor; they are both nurses.',
        opts: ['Both; and', 'Either; or', 'Neither; nor', 'Not only; but also'],
        a: 2,
        explain: '两人都是护士，说明都不是医生，两者全否定用 Neither…nor，谓语按就近的单数用 is。',
      },
      {
        q: 'The teacher asked us to read the dialogue aloud and ____ the new words in the dictionary.',
        opts: ['looking up', 'set', 'looked up', 'to looking up'],
        a: 1,
        explain: 'and 前后要对称：to read…and (to) set，都用动词原形。',
      },
    ],
  },
  {
    id: 'g28',
    title: '时态补漏：将来说法、频率副词与时间标志词',
    en: 'Future Forms, Frequency Adverbs and Time Markers',
    level: '进阶',
    exam: '中考',
    mins: 8,
    intro: '这一课补三个空：将来还不止 will 一种写法，频率副词有固定位置，ago 与 already 属于两条不同的时间线。',
    sections: [
      {
        h: '表将来的三副面孔',
        body: 'will 说临场决定和预测，be going to 说已经打好的算盘或有眼前迹象的事。位移动词 go、come、leave、arrive、start、fly 用现在进行时，可以表示已经安排好的将来。be about to + 动词原形说“马上就要”，后面不再接 tomorrow 这类远时间；be to do 说正式约定。',
        examples: [
          { en: 'My aunt is flying to Chengdu tomorrow morning.', zh: '我阿姨明天早上飞成都。' },
          { en: 'We are to meet at the gate of the science museum at nine.', zh: '我们约定九点在科技馆门口集合。' },
        ],
      },
      {
        h: '频率副词的位置：实义动词前，be 之后',
        body: 'always、usually、often、sometimes、seldom、hardly ever、never 属于频度副词，放在实义动词之前，放在 be 动词、助动词、情态动词之后。never 本身已含否定，不再另加 not。位置放错，句子就读不通了。',
        examples: [
          { en: 'I usually do my homework right after dinner.', zh: '我通常一吃完晚饭就写作业。' },
          { en: 'Kate is never late for the morning reading.', zh: '凯特晨读从不迟到。' },
        ],
      },
      {
        h: 'ago / already / yet / just / still 的时间线',
        body: 'ago 把动作钉在过去，配的是一般过去时；already、just、yet 站在现在回头看，配现在完成时。already 和 just 放在 have / has 与过去分词之间，多用于肯定句；yet 用于否定句和疑问句，常放句末。still 说“还在继续”，位置在实义动词前。',
        examples: [
          { en: 'I have just finished the reading task, so I can help you now.', zh: '我刚做完这个阅读任务，现在可以帮你了。' },
          { en: 'Have you tidied up your bedroom yet?', zh: '你整理好卧室了吗？' },
        ],
      },
    ],
    keyPoints: [
      'go、come、leave、fly 等位移动词用进行时表已安排好的将来',
      'be about to 表马上就要，后不接 tomorrow 等远时间词',
      'never 本身含否定不再加 not，seldom、hardly ever 也表否定频率',
      'already、just 放 have/has 与过去分词之间，yet 放否定疑问句末',
    ],
    pitfall: '频率副词不要插进动词和宾语之间：要说 I usually do my homework，不是 I do usually my homework。already 也不能和明确的过去时间同现：He has already left here two days ago. 是错的，改成 He left here two days ago. 或 He has already left.',
    quiz: [
      {
        q: '— Where are you going this weekend? — I ____ my grandparents in the countryside.',
        opts: ['am visiting', 'visit', 'visited', 'visiting'],
        a: 0,
        explain: '问句用现在进行时问已定安排，回答也用 visit 的进行时表将来，且需要 am 配主语 I。',
      },
      {
        q: 'Stand back, please! The concert ____ start in a minute.',
        opts: ['about to', 'is about to', 'are about to', 'will about'],
        a: 1,
        explain: '主语 the concert 是单数，用 is about to + 动词原形，说马上就要开始。',
      },
      {
        q: 'Peter ____ his room on Sunday morning, so it stays tidy all week.',
        opts: ['tidies always', 'is always tidies', 'always tidies', 'always tidy'],
        a: 2,
        explain: '频率副词放在实义动词之前，主语三单所以动词用 tidies，构成 always tidies。',
      },
      {
        q: 'My maths teacher is ____ patient with us, even when we make the same mistake twice.',
        opts: ['is always', 'always', 'always being', 'has always'],
        a: 1,
        explain: '句中已经有 be 动词 is，频率副词直接放在它后面，用 always。',
      },
      {
        q: '— Have you read the novel ____? — Yes, I finished it two days ____.',
        opts: ['already; ago', 'yet; before', 'already; later', 'yet; ago'],
        a: 3,
        explain: '现在完成时的疑问句末尾用 yet；two days ago 配一般过去时 finished。',
      },
      {
        q: 'The students ____ to the hall for the speech competition; they will come back before four.',
        opts: ['just have gone', 'have just been', 'have just gone', 'went just'],
        a: 2,
        explain: '复数主语用 have，just 放在助动词与过去分词之间；have gone 表示去了还没回来。',
      },
    ],
  },
  {
    id: 'g29',
    title: '非限制性定语从句：which / as 与介词 + which',
    en: 'Non-restrictive Relative Clauses',
    level: '高阶',
    exam: '高考',
    mins: 8,
    intro: '逗号一加，从句就从“限定身份”变成“补充说明”。这种从句有三条硬规矩：不用 that，不省关系词，which 还能指代前面整句话。',
    sections: [
      {
        h: '非限制性从句只补充信息，前面必须有逗号',
        body: '它给主语附带补一句说明，删掉之后主句意思仍然完整，所以它与主句之间一定用逗号隔开。先行词本来就是唯一的那一个（我姑姑、这条街上的书店）时，只能用这种从句来补充。指人用 who / whom / whose，指物用 which，绝不能用 that，关系词也不能省略。',
        examples: [
          { en: 'My aunt, who is nearly sixty, still learns Italian online.', zh: '我姑姑快六十岁了，还在网上学意大利语。' },
          { en: 'The little bookshop, which has stood on this street for a century, is closing next month.', zh: '那家在这条街开了一百年的小书店下个月要关门了。' },
        ],
      },
      {
        h: 'which 指整件事，as 表示“正如”',
        body: 'which 可以指代前面一整个主句，语气里常带评价或意外。as 同样指整句，但意思是“正像、正如”，位置更灵活，能放在主句之前。高考阅读里常见的搭配有 as we expected、as often happens、as is known to all。',
        examples: [
          { en: 'As we had feared, the whole match was called off.', zh: '正如我们担心的那样，整场比赛被取消了。' },
          { en: 'He passed the exam in his first month, which surprised even his own parents.', zh: '他第一个月就通过了考试，这连他父母都感到意外。' },
        ],
      },
      {
        h: '介词 + which 与“几个 + of which”',
        body: '介词提到关系词前面时，指物只能用 which，不能换成 that；指人则用 whom。想说“其中几个、大多数”时，用 many / most / several / none + of which，指人用 of whom。这是书面表达里很好用的加分句型，但前提是句子读得通，别为了用而用。',
        examples: [
          { en: 'The old house in which Mo Yan grew up has become a reading room.', zh: '莫言长大的那所老房子已经变成了阅览室。' },
          { en: 'She keeps dozens of postcards, several of which were drawn by her own students.', zh: '她留着几十张明信片，其中好几张是她自己的学生画的。' },
        ],
      },
    ],
    keyPoints: [
      '逗号后从句指代前面整件事，无提示词空填 which，作主语或宾语',
      '介词后指物填 which 指人填 whom，如 in front of which',
      'most、many、several 加 of 后填 which 或 whom，说明其中部分',
      'as we expected、as is known to all 表正如，是阅读高频搭配',
    ],
    pitfall: '逗号后面的从句里不写 that，也不省关系词：My brother, that lives in Shanghai, is a pilot. 是错的，要改成 My brother, who lives in Shanghai, is a pilot. 另外 as 引导的“正如”从句可以放在句首，which 不行。',
    quiz: [
      {
        q: 'My uncle is crazy about collecting old bus tickets, ____ I find rather hard to understand.',
        opts: ['that', 'which', 'it', 'what'],
        a: 1,
        explain: '逗号后的从句指代前面整件事，非限制性定语从句只能用 which，that 不进这种从句。',
      },
      {
        q: '____ everybody can see, a good habit saves more time than it costs.',
        opts: ['Which', 'It', 'That', 'As'],
        a: 3,
        explain: '从句放在主句前、意思是“正如”，只能用 as；which 引导的非限制性从句不能提到句首。',
      },
      {
        q: 'The little theatre, in front of ____ stood only a few wooden chairs, is now a coffee shop.',
        opts: ['which', 'that', 'it', 'whose'],
        a: 0,
        explain: '介词后面指物只能用 which，that 不能紧跟介词；填 it 会让一个句子里出现两个谓语。',
      },
      {
        q: 'Our English teacher, ____ has published three books about local customs, comes from a mountain village.',
        opts: ['that', 'which', 'who', 'whom'],
        a: 2,
        explain: '先行词是人、关系词在从句中作主语，用 who；whom 只能作宾语，that 不能进非限制性从句。',
      },
      {
        q: 'She wrote a long letter to her cousin, most of ____ was about the new school.',
        opts: ['them', 'that', 'it', 'which'],
        a: 3,
        explain: 'most of 后接 which 指代那封信的内容，构成非限制性从句；填 them 就成了只用逗号相连的两个句子。',
      },
      {
        q: 'The old bridge across the river, ____ dates back to the Ming Dynasty, is still open to traffic.',
        opts: ['where', 'which', 'that', 'when'],
        a: 1,
        explain: '从句缺主语，用 which 指代 bridge；where 和 when 在从句里只能作状语，填进去仍然缺主语。',
      },
    ],
  },
  {
    id: 'g30',
    title: '同位语从句与定语从句：一句之差怎么判',
    en: 'Appositive Clauses vs Relative Clauses',
    level: '高阶',
    exam: '高考',
    mins: 8,
    intro: '两种从句都能跟在名词后面，区别只看一件事：从句里缺不缺成分。缺成分的是定语从句，不缺的是同位语从句。',
    sections: [
      {
        h: '同位语从句说出抽象名词的内容',
        body: 'news、fact、idea、hope、question、suggestion、doubt、proof 这些抽象名词后面，可以跟一个完整的句子，说明它具体是什么。这里的 that 只起连接作用，在从句里不作任何成分，也因此在高考书面表达里不要省略。判断方法：把从句单独读一遍，主语、宾语、表语都齐了，它就是同位语从句。',
        examples: [
          { en: 'The fact that the little stone bridge still stands surprises the engineers.', zh: '那座小桥依然屹立这一事实让工程师们吃惊。' },
          { en: 'His dream that one day he will teach in a mountain school never faded.', zh: '他有朝一日去山区学校教书的梦想从未褪色。' },
        ],
      },
      {
        h: '定语从句里的 that 必须顶一个成分',
        body: '如果从句本身缺主语或宾语，关系词就要进去填这个位置，这时它是定语从句，作用是限定前面的名词。做法是把名词挪进从句读一遍：能当主语或宾语的，就是定语从句。定语从句里 that 作宾语时常可省略，同位语从句里的那个 that 却不能。指人用 who，指物用 that / which，what 两者都不能引导。',
        examples: [
          { en: 'The news that our monitor told us this morning proved wrong.', zh: '班长今早告诉我们的那条消息后来证明是错的。' },
          { en: 'The suggestion that our monitor gave us this morning is useful.', zh: '班长今早给我们的那条建议很有用。' },
        ],
      },
      {
        h: 'whether 能进同位语，if 和 what 不行',
        body: '名词本身表示悬而未决的事情时，同位语从句用 whether 表“是否”，不用 if。what 必须在从句里作成分，所以它带不出一个完整的同位语从句。when、where、who、what 也能跟在 question、idea 后面，但要按从句缺什么来选：缺状语选 when / where，缺主语宾语才选 what。',
        examples: [
          { en: 'I have no idea whether the museum opens on Mondays.', zh: '我不知道博物馆周一是否开放。' },
          { en: 'The question when the new library will open is still on the board.', zh: '新图书馆何时开放，这个问题还挂在公告板上。' },
        ],
      },
    ],
    keyPoints: [
      'news、fact、idea 等抽象名词后，从句成分齐全填 that 说明内容',
      '从句缺主语或宾语是定语从句，指物填 that 或 which，作宾语可省',
      'doubt 肯定句后填 whether；question 后缺状语填 when/where',
      '把名词挪进从句读一遍，能作成分是定从，不能是同位语从句',
    ],
    pitfall: '同位语从句的 that 别省，也别换成 what：写作里 the fact he left early 不如 the fact that he left early 稳。另外 if 不能引导同位语从句，the news if we won 是错的，表“是否”只有 whether 能跟在 news、question 后面。',
    quiz: [
      {
        q: 'The fact ____ our little team beat the champions has been talked about for a whole week.',
        opts: ['which', 'that', 'what', 'where'],
        a: 1,
        explain: '从句主语、宾语都齐全，空格只负责引出 fact 的内容，that 不作成分，这是同位语从句。',
      },
      {
        q: 'The story ____ Grandpa told us last night turned out to be a newspaper report.',
        opts: ['why', 'when', 'that', 'what'],
        a: 2,
        explain: 'told 后面缺宾语，that 顶替 story 在从句里作成分，是定语从句，口语中还可以省略。',
      },
      {
        q: 'There is still some doubt ____ the opening ceremony will be held in the rain.',
        opts: ['that', 'which', 'whether', 'what'],
        a: 2,
        explain: 'doubt 用于肯定句时接 whether 表“是否”；that 表示内容是确定的，与“仍有疑问”矛盾。',
      },
      {
        q: 'We have not settled the question ____ the museum is open to visitors on Monday.',
        opts: ['if', 'that', 'which', 'whether'],
        a: 3,
        explain: '同位语从句里表“是否”只能用 whether，if 不能引导同位语从句。',
      },
      {
        q: 'His mother has no idea ____ he has put all his pocket money.',
        opts: ['what', 'that', 'where', 'whether'],
        a: 2,
        explain: 'put 的宾语 all his pocket money 已经给出，从句只缺地点，所以用 where 补足 idea 的内容。',
      },
      {
        q: 'Which of the following sentences is correct?',
        opts: ['The suggestion that we plant trees on the hill is practical.', 'The suggestion if we plant trees on the hill is practical.', 'The suggestion what we plant trees on the hill is practical.', 'The suggestion who we plant trees on the hill is practical.'],
        a: 0,
        explain: '同位语从句用 that 引出 suggestion 的内容；if 不能引导同位语从句，what 又必须在从句里作成分。',
      },
    ],
  },
  {
    id: 'g31',
    title: '省略句：从句省主语、并列省重复、答句留 to',
    en: 'Ellipsis',
    level: '进阶',
    exam: '高考',
    mins: 7,
    intro: '省略不是偷懒，而是把重复的部分删掉。三条底线：主语必须与主句一致，be 动词要在场，答句里的 to 不能丢。',
    sections: [
      {
        h: '状语从句省掉“主语 + be”',
        body: 'when、while、if、unless、once、though、as if 引导的状语从句，如果主语和主句主语相同、谓语里又有 be，就可以把“主语 + be”一起删，只留分词、形容词或不定式。删掉之后必须能原样补回去，否则不能省。被动关系留过去分词，主动关系留现在分词。',
        examples: [
          { en: 'When asked about the accident, the driver said nothing at all.', zh: '被问起那场事故时，司机什么也没说。' },
          { en: 'Unless otherwise invited, do not bring anyone to the rehearsal.', zh: '除非另有邀请，否则不要带任何人来排练。' },
        ],
      },
      {
        h: '并列句里省掉重复的主语和谓语',
        body: 'and、but、or 连接的分句，主语相同就只写一次。助动词或系动词后面与前面完全相同的动词短语也可以省，只留助动词，如 He can swim but she can’t。否定对照还常写成 not ... but ...，前半句的内容靠上下文凭着补回来。',
        examples: [
          { en: 'Tom washed the dishes and his sister dried them.', zh: '汤姆洗碗，他姐姐把碗擦干。' },
          { en: 'He accepted the plan but said nothing about the cost.', zh: '他接受这个方案，但对费用一事只字未提。' },
        ],
      },
      {
        h: '答句保留 to，so 与 not 代替整句',
        body: '省略不定式后面的动词时，to 必须留着：I’d love to、He didn’t do it, though he tried to。I hope so 与 I’m afraid not 用 so 或 not 顶替整个从句，避免重复。还要注意还原：主动句 make sb do sth 变被动后，被省掉的 to 要回来，写成 be made to do。',
        examples: [
          { en: 'Did you lock the door? I meant to, but I forgot.', zh: '你锁门了吗？我本打算锁，结果忘了。' },
          { en: 'The pupil was made to repeat the whole dialogue twice.', zh: '那个小学生被迫把整段对话重复了两遍。' },
        ],
      },
    ],
    keyPoints: [
      'when、while、if、unless 后直接跟分词，是省略了主语和 be 的结构',
      '省略后主语与动词是被动关系留 done，如 When asked；主动留 doing',
      'and、but 后主语与前句相同可省，第二个谓语时态与前句一致',
      '主动 make sb do 变被动后补回 to，写成 be made to do',
    ],
    pitfall: '省主语的前提是从句主语就是主句主语。While reading the novel, the lamp went out. 错在读小说的人不是 the lamp，把主语补回去写成 While I was reading the novel 才对。另外答句里不能把 to 丢掉，I’d love 后面必须留着 to。',
    quiz: [
      {
        q: 'When ____ about the trip, the children shouted with joy.',
        opts: ['told', 'they told', 'telling', 'was told'],
        a: 0,
        explain: 'When told 等于 When they were told：从句主语与主句一致、谓语含 be，才能把“主语 + be”一起删；孩子们是“被告知”，用过去分词。',
      },
      {
        q: 'Would you like to swim with us? I’d love ____, but I have to finish my homework first.',
        opts: ['it', 'do', 'going', 'to'],
        a: 3,
        explain: '答句里省略不定式的内容时，to 必须留着，只能说 I’d love to。',
      },
      {
        q: 'While ____ the old photos, she kept telling us where each one had been taken.',
        opts: ['she looked at', 'looking at', 'looked at', 'she looking at'],
        a: 1,
        explain: 'While looking at 等于 While she was looking at，主语一致才能省；她主动看照片，用现在分词。',
      },
      {
        q: 'Which sentence is NOT correct?',
        opts: ['If heated, water turns into steam.', 'If it is heated, water turns into steam.', 'Heated the water, it turns into steam.', 'When heated, water turns into steam.'],
        a: 2,
        explain: 'Heated the water 不是省略结构，主语 it 与 heat 对不上。水是“被加热”的，正确写法是 If 或 When heated。',
      },
      {
        q: 'The teacher praised Lucy for her essay and ____ Jim a few words of encouragement.',
        opts: ['gave', 'give', 'giving', 'was given'],
        a: 0,
        explain: 'and 后的分句与前面主语相同，主语 the teacher 只写一次；并列的第二个谓语直接用过去式 gave。',
      },
      {
        q: 'Unless ____ in advance, the tickets cannot be changed.',
        opts: ['you book', 'booking', 'booked', 'to book'],
        a: 2,
        explain: 'Unless booked 等于 Unless they are booked：票是“被预订”的，用过去分词；主语与主句一致才能这样省。',
      },
    ],
  },
  {
    id: 'g32',
    title: '构词法（上）：前缀定方向，后缀定词性',
    en: 'Word Formation I: Prefixes and Suffixes',
    level: '进阶',
    exam: '高考',
    mins: 6,
    intro: '生词不查词典也能猜个大概：前缀给方向，后缀给词性，中间是词根。阅读时把这三块拆开，意思就露出来了。',
    sections: [
      {
        h: '否定前缀：un- / in- / im- / il- / ir- / dis- / mis-',
        body: 'un- 最通用，常加在形容词和分词前：unfair、unknown。in- 这一组多用于拉丁来源的词，按首字母挑：im- 用在 p、b、m 前（impossible），il- 用在 l 前（illegal），ir- 用在 r 前（irregular）。dis- 否定动作或态度，如 disagree、disappear。mis- 不是“不做”，而是“做错”：misread、misunderstand。',
        examples: [
          { en: 'The instructions were so unclear that half the class answered the wrong questions.', zh: '题目说明太不清楚，半个班都答错了题。' },
          { en: 'Nobody noticed that the map had been labelled wrongly.', zh: '没有人发现这张地图被标错了。' },
        ],
      },
      {
        h: '程度与方向前缀：over- / under- / re- / pre- / sub- / ex-',
        body: 'over- 是“过头”，under- 是“不够”，两个方向正好相反：overestimate 与 underestimate、overweight 与 underweight。re- 表“再一次”，pre- 表“事先”，sub- 表“在……下面”，ex- 表“前任”。这类前缀只改意思，不改词性，词性由后面的部分决定。',
        examples: [
          { en: 'We overestimated the distance and walked four hours without any water.', zh: '我们高估了这段路，没带水就走了四个小时。' },
          { en: 'The ex-manager still drops by the shop, though he retired last spring.', zh: '前任经理虽然去年春天退休了，还是常到店里来。' },
        ],
      },
      {
        h: '后缀定词性：-tion / -ment / -ance / -ness / -ity',
        body: '动词变名词最常加 -tion 或 -sion：develop 成 development，decide 成 decision。加 -ment 的有 movement、agreement、punishment。加 -ance / -ence 的有 performance、confidence、absence。形容词变名词加 -ness 或 -ity：kind 成 kindness，able 成 ability。看到这些尾巴，先按它在该句里的语法位置验证一下是不是名词。',
        examples: [
          { en: 'The development of the village brought back a lot of young people.', zh: '村里的发展把许多年轻人引了回来。' },
          { en: 'Her refusal to explain the rule made the whole class confused.', zh: '她拒绝解释这条规则，这让全班同学都很困惑。' },
        ],
      },
    ],
    keyPoints: [
      '空格作主语或宾语且后有 of，提示词动词要变名词，加 tion 或 ment',
      '冠词或物主代词后填名词：confident 变 confidence',
      'im- 用在 p、b、m 前，il- 在 l 前，ir- 在 r 前，按首字母选前缀',
      'over- 表过头 under- 表不足，mis- 表做错，按句意选前缀方向',
    ],
    pitfall: '否定前缀不能随便换：impossible 不写 unpossible，irregular 不写 unregular，这些搭配是固定的。也别以为有 un- 就一定是否定：unlike 是介词“和……不同”，mistake 是“做错”而不是“没做”。',
    quiz: [
      {
        q: 'The exam instructions were ____, so half the class answered the wrong questions.',
        opts: ['unable', 'unreading', 'unreadable', 'unreads'],
        a: 2,
        explain: 'readable 表“读得懂的”，前面加 un- 变否定；-able 这个后缀说明它是“能被……的”。',
      },
      {
        q: 'He ____ the timetable and waited for a bus that never came.',
        opts: ['misread', 'misunderstood', 'mistaken', 'overread'],
        a: 0,
        explain: 'mis- 表“做错”，misread the timetable 就是“把时刻表看错了”；misunderstand 一般接话或人的意思，不接表册。',
      },
      {
        q: 'The ____ of the new rules took three months, because nobody wanted to change an old habit.',
        opts: ['implementing', 'implementation', 'implementable', 'implement'],
        a: 1,
        explain: '空格在句首作主语，后面还有 of，需要名词 implementation；implementing 之后应直接跟宾语，不接 of。',
      },
      {
        q: 'The tent fell because the two ropes were ____, each holding more than it could bear.',
        opts: ['overlooked', 'underused', 'overgrown', 'overloaded'],
        a: 3,
        explain: 'over- 表“超出”，overloaded 是“负荷太重”，与“每根绳子都承受了太多”呼应；overgrown 指“长满”。',
      },
      {
        q: 'Her ____ in front of the class grew a lot during the second term.',
        opts: ['confidence', 'confidently', 'confident', 'confidential'],
        a: 0,
        explain: '物主代词 Her 后面要接名词，-ence 是 confidence 的名词后缀；confident 是形容词，confidential 意思不同。',
      },
      {
        q: 'The damage is ____ to repair, so the museum ordered a copy instead.',
        opts: ['unpossible', 'dispossible', 'impossible', 'inpossible'],
        a: 2,
        explain: '以 p 开头的词用 im- 表否定，impossible 是唯一成立的搭配，其余三个前缀都不能接 possible。',
      },
    ],
  },
  {
    id: 'g33',
    title: '构词法（下）：合成词、词性转换与写作升级',
    en: 'Word Formation II: Compounds and Conversion',
    level: '进阶',
    exam: '高考',
    mins: 6,
    intro: '把两个现成的词拼在一起，或者让名词直接当动词用，是英语造新词最常用的两招，也是作文里让用词升一级的入口。',
    sections: [
      {
        h: '合成名词与合成形容词',
        body: '合成词有三种写法：连在一起（notebook、teenager）、带连字符（warm-hearted、after-class）、分开写（high school）。合成形容词里的名词不用复数，也不加 -s：a five-year-old boy、a ten-metre rope。合成名词变复数时只变主要的那个名词：passer-by 成 passers-by，son-in-law 成 sons-in-law。',
        examples: [
          { en: 'Two passers-by stopped their bikes to help the old woman pick up the apples.', zh: '两个路人停下自行车，帮那位老太太捡苹果。' },
          { en: 'The twelve-year-old girl has already won three swimming races.', zh: '这个十二岁的女孩已经赢过三场游泳比赛了。' },
        ],
      },
      {
        h: '名词直接当动词，形容词靠后缀',
        body: '词性转换不加任何词尾：shoulder 从“肩膀”变“用肩扛”，water 从“水”变“浇水”，empty 从“空的”变“倒空”。形容词后缀里，-ful 表“充满”，-less 表“没有”：hopeful 与 hopeless、careful 与 careless。-y、-ish、-ous 也常从名词派生：rain 成 rainy，child 成 childish，danger 成 dangerous。',
        examples: [
          { en: 'She shouldered her bag and left without saying goodbye.', zh: '她背起包，连再见都没说就走了。' },
          { en: 'One careless mistake made the whole experiment useless.', zh: '一个粗心的错误让整个实验白费了。' },
        ],
      },
      {
        h: '写作里的用词升级',
        body: '把短语换成派生词，句子立刻紧凑：full of hope 说成 hopeful，without limit 说成 limitless。形容词或名词加 -ize 变成“使……化”的动词：modernize、organize、specialize。同义词也要按书面程度换：good 换 beneficial，bad 换 harmful，many 换 numerous，get 换 obtain。',
        examples: [
          { en: 'The school modernized its science lab over the summer holiday.', zh: '学校暑假期间把科学实验室升级了。' },
          { en: 'Regular exercise is beneficial to the heart, while sitting too long is harmful.', zh: '规律运动对心脏有益，久坐则有害。' },
        ],
      },
    ],
    keyPoints: [
      '合成名词复数只变主体词：passers-by、sons-in-law',
      '名词可直接作动词：shoulder 表扛、water 表浇水，按谓语位置判断',
      'has 后填过去分词：modern 先加 ize 变动词再变 modernized',
      '作文用 beneficial 替 good，numerous 替 many，提升书面度',
    ],
    pitfall: '合成形容词里的名词不带复数：a five-years-old boy 是错的，要写 a five-year-old boy。加后缀时也常丢字母：hope 加 less 是 hopeless 不是 hopless，care 加 less 是 careless，-ful 只有一个 l。',
    quiz: [
      {
        q: 'A ____ bridge was built over the river last year.',
        opts: ['200-metre-long', '200 metres long', '200-metres-long', '200-long-metre'],
        a: 0,
        explain: '带连字符的合成形容词里名词用单数，整个结构放在名词前作定语。',
      },
      {
        q: 'Two ____ stopped their bikes to help the old woman pick up the apples.',
        opts: ['passer-bys', 'passers-by', 'passers-bys', 'passerbys'],
        a: 1,
        explain: '合成名词变复数只变主要的那个名词，passer 变 passers，by 不动。',
      },
      {
        q: 'Our new PE teacher is a ____ young man who never says no to a game.',
        opts: ['looking-good', 'looking-nice', 'nice-looked', 'good-looking'],
        a: 3,
        explain: '合成形容词是“修饰成分 + 分词”，look 用现在分词表主动，good-looking 是习惯说法。',
      },
      {
        q: 'The meeting went on for three hours without any decision; it seemed ____.',
        opts: ['countless', 'limitless', 'endless', 'hopeless'],
        a: 2,
        explain: 'endless 是“没完没了的”，正对开了三小时还没结论；countless 修饰可数事物的数量，limitless 指“无极限”。',
      },
      {
        q: 'On the way to the station she asked me to ____ her bag while she bought the tickets.',
        opts: ['shouldered', 'shoulders', 'shoulder on', 'shoulder'],
        a: 3,
        explain: 'shoulder 由名词“肩膀”直接当动词用，表“用肩扛”；ask sb to 后接动词原形。',
      },
      {
        q: 'The town has ____ its old market twice since 2010.',
        opts: ['modern', 'modernized', 'modernization', 'modernise'],
        a: 1,
        explain: 'has 后面要用过去分词，-ize 让 modern 变成“使……现代化”的动词；modernise 是原形，接在 has 后不成立。',
      },
    ],
  },
  {
    id: 'g34',
    title: '情态动词表推测：must be 与 must have done',
    en: 'Modals for Deduction',
    level: '高阶',
    exam: '高考',
    mins: 8,
    intro: '推测题只看两件事：把握有多大，推测的是现在还是过去。把握从大到小是 must、will、may / might；有把握地否定，只能交给 can’t。',
    sections: [
      {
        h: '对现在：must be / can’t be / may be',
        body: 'must do 表“肯定如此”，把握最大。can’t do 表“不可能”，是有把握的否定推测。may 与 might 表“也许”，might 更没把握，could 也能表这种可能。mustn’t 是“禁止”，needn’t 是“不必”，它们都不表推测，所以否定的推测不能用 mustn’t 顶替 can’t。',
        examples: [
          { en: 'The light in his office is still on, so he must be working late.', zh: '他办公室的灯还亮着，他一定在加班。' },
          { en: 'It can’t be Auntie May at the door; she is in Guangzhou all this week.', zh: '门口不可能是梅阿姨，她这整周都在广州。' },
        ],
      },
      {
        h: '对过去：must have done / can’t have done',
        body: '推测过去发生的事，用“情态动词 + have done”。must have done 是“一定做过”，can’t 或 couldn’t have done 是“不可能做过”，may 与 might have done 是“也许做过”。线索通常藏在前面那句的结果或证据里，时态上还要与“过去”对得上。',
        examples: [
          { en: 'The road was closed, so the coach must have taken the long way round.', zh: '路被封了，大巴一定绕了远路。' },
          { en: 'You did nothing all afternoon, so you can’t have finished the report yet.', zh: '你整个下午什么都没做，不可能已经写完了报告。' },
        ],
      },
      {
        h: '与事实相反：should / could / needn’t have done',
        body: 'should have done 是“本该做却没做”，常带责怪口气。could have done 是“当时本有条件做到，但没做成”。needn’t have done 表示“做了，其实没必要”，而 didn’t need to do 表示“没必要做，所以没做”。这一组是高考单选题和短文改错的高频考点。',
        examples: [
          { en: 'I should have checked the time; I arrived twenty minutes late.', zh: '我本该先看一下时间的，结果迟到了二十分钟。' },
          { en: 'You needn’t have brought coffee, since there were three boxes in the kitchen.', zh: '你其实不必带咖啡来，厨房里本来就有三箱。' },
        ],
      },
    ],
    keyPoints: [
      '眼前有证据推测过去的事，填 must have done，如地湿推夜里下过雨',
      '把握不大的过去推测用 might have done，线索常在前句的结果里',
      'should have done 本该做却没做，could have done 本可做成',
      'needn\'t have done 表做了没必要，didn\'t need to 表没做',
    ],
    pitfall: '把 mustn’t have done 当成“一定没做过”是错的：否定过去的推测要用 can’t 或 couldn’t have done。另外 must have done 是“我猜他做过”，should have done 是“他本该做却没做”，差一个词，事实正好相反。',
    quiz: [
      {
        q: 'Look at the empty plate and the dog beside the window. It ____ the last biscuit again.',
        opts: ['must have eaten', 'must eat', 'should eat', 'had to eat'],
        a: 0,
        explain: '证据就在眼前，推测的是刚才发生的事，用 must 加 have done 表“过去一定做过”。',
      },
      {
        q: 'It ____ be Uncle Chen driving that car; he has never learned to drive.',
        opts: ['needn’t', 'mustn’t', 'won’t', 'can’t'],
        a: 3,
        explain: '有把握地否定推测只能用 can’t；mustn’t 表“禁止”，needn’t 表“不必”，都不是推测。',
      },
      {
        q: 'The letter came this morning, but I am not sure who wrote it. It ____ from my old host family.',
        opts: ['must have come', 'can’t have come', 'might have come', 'need have come'],
        a: 2,
        explain: '不确定是谁写的，把握不大的过去推测用 might have done；must have done 太肯定。',
      },
      {
        q: 'The ground is wet all over. It ____ all night.',
        opts: ['may rain', 'must have rained', 'had rained', 'must be raining'],
        a: 1,
        explain: '现在的地面是证据，推测的是过去一整夜的事，用 must have rained；must be raining 说的是此刻正在下。',
      },
      {
        q: 'We carried six bottles of water for a ten-minute walk. We ____ them.',
        opts: ['mustn’t have taken', 'can’t have taken', 'needn’t have taken', 'shouldn’t take'],
        a: 2,
        explain: '水确实带了，只是本无必要，用 needn’t have done；can’t have taken 会否认真带过这件事。',
      },
      {
        q: 'You had the whole afternoon free. You ____ me a hand, but you went out to play football.',
        opts: ['should help', 'must have helped', 'had to help', 'could have helped'],
        a: 3,
        explain: '当时有条件帮忙却没有做，用 could have done；该责备“本该帮”要用 should have helped。',
      },
    ],
  },
  {
    id: 'g35',
    title: '时态补全：完成进行时、过去将来与将来两处时限',
    en: 'Further Tenses: Perfect Continuous and Future Forms',
    level: '高阶',
    exam: '高考',
    mins: 9,
    intro: '这四个时态都能靠时间词认出来：for 和 since 找完成进行时，by 加将来时间找将来完成，this time tomorrow 找将来进行。',
    sections: [
      {
        h: '现在完成进行时 have been doing',
        body: '结构是 have / has been 加 doing，动作从过去开始、一直做到现在，往往刚停或还在继续，并留下看得见的痕迹。它与现在完成时的区别在于强调过程和时长，所以动词必须能延续：wait、rain、study、cook 可以，buy、die、join 这类瞬间动词不行，要说 has been dead 而不是 has been dying。',
        examples: [
          { en: 'Mum has been cooking since six, and the whole flat smells of soup.', zh: '妈妈从六点起就在做饭，整套房子都是汤的味道。' },
          { en: 'Your eyes are red. Have you been crying again?', zh: '你眼睛红了，是不是又哭了？' },
        ],
      },
      {
        h: '过去将来时 would do 与 was going to do',
        body: '站在过去某个时间点看以后，就是过去将来时，常出现在转述和叙事里：he said he would come。was 或 were going to 还多一层“本打算做却没做成”的意思。was to do 表“原定、注定”，was about to do 表“正要”，后两者在完形填空里也常考。',
        examples: [
          { en: 'Dad promised that he would take us to Tibet the following summer.', zh: '爸爸答应第二年夏天带我们去西藏。' },
          { en: 'We were going to visit the science museum, but the tickets sold out by nine.', zh: '我们本打算去科技馆，可九点钟票就卖光了。' },
        ],
      },
      {
        h: '将来进行 will be doing 与将来完成 will have done',
        body: 'will be doing 说将来某一时刻正在进行，信号词是 this time next Sunday、at eight tomorrow evening。will have done 说到将来某一点之前已经做完，信号词是 by the end of、by nine o’clock、by the time 加从句。by 后面如果接的是过去时间点，就要改用过去完成时。',
        examples: [
          { en: 'This time tomorrow I will be flying to Chengdu, so I can’t meet you tonight.', zh: '明天这个时候我正飞往成都，所以今晚见不了你。' },
          { en: 'By the end of this term we will have learned about two thousand words.', zh: '到本学期末，我们将学完大约两千个单词。' },
        ],
      },
    ],
    keyPoints: [
      'all morning 加眼前痕迹，填 have been doing 强调过程',
      'this time next Sunday 等将来时刻点，填 will be doing',
      'by the end of 加将来时间，填 will have done 表到那时已完成',
      'promised 后从句用 would do；were going to 表本打算却未成',
    ],
    pitfall: '两个高频错：一是把瞬间动词放进完成进行时，写出 He has been dying for two years，应改为 He has been dead for two years；二是看到 by the end of last term 还用将来完成，那是过去的时间点，要用过去完成时。',
    quiz: [
      {
        q: 'The kitchen is in a mess and Mum is still inside. She ____ cakes all morning.',
        opts: ['baked', 'has been baking', 'has been baked', 'is baked'],
        a: 1,
        explain: 'all morning 延续到说话的此刻，还留下看得见的痕迹，用 have been doing；主语是人，不用被动。',
      },
      {
        q: 'This time next Sunday I ____ on the beach, so I cannot answer any emails for you.',
        opts: ['will lie', 'have lain', 'am lying', 'will be lying'],
        a: 3,
        explain: 'this time next Sunday 指向将来某一时刻正在进行，用 will be doing。',
      },
      {
        q: 'By the end of this term the school ____ the whole playground, so PE lessons will go on as usual.',
        opts: ['will have resurfaced', 'will be resurfacing', 'has resurfaced', 'is resurfacing'],
        a: 0,
        explain: 'by 加将来时间是将来完成的信号，表示到那时动作已经完成，用 will have done。',
      },
      {
        q: 'Dad promised in 2018 that he ____ us to Tibet the following summer.',
        opts: ['will take', 'takes', 'would take', 'had taken'],
        a: 2,
        explain: '从 promised 这个过去时间点看以后，用 would do 表过去将来。',
      },
      {
        q: 'We ____ to watch the evening show, but the tickets sold out before noon.',
        opts: ['went', 'have gone', 'were going', 'are going'],
        a: 2,
        explain: 'were going to 表本打算做却没有做成，后半句票提前卖光正是它没实现的原因。',
      },
      {
        q: 'The whole street is still wet. It ____ for two hours and only stopped a minute ago.',
        opts: ['has been raining', 'is raining', 'had rained', 'would rain'],
        a: 0,
        explain: 'for two hours 强调持续的过程，雨刚停而痕迹还在，用现在完成进行时；had rained 会把下雨推到更早的过去。',
      },
    ],
  },
  {
    id: 'g36',
    title: '主将从现与从句时态配合',
    en: 'Future in the Main Clause, Present in the Subordinate Clause',
    level: '进阶',
    exam: '高考',
    mins: 7,
    intro: '时间、条件状语从句里不出现 will，这就是主将从现。但 when 引导宾语从句、if 表示“是否”时 will 必须留着，所以先判断从句种类，再动时态。',
    sections: [
      {
        h: '时间与条件从句用现在时代替将来',
        body: 'when、while、before、after、as soon as、until、till、unless、once、the moment 引导的时间与条件状语从句，主句说将来，从句用一般现在时表示将来。要强调从句动作先完成时，从句用现在完成时。从句里不写 will，这是高考单选和语法填空最常考的一条。',
        examples: [
          { en: 'I will text you as soon as the film begins.', zh: '电影一开演我就给你发信息。' },
          { en: 'Unless the weather changes, the sports meeting will be held tomorrow morning.', zh: '除非天气有变，运动会明早照常举行。' },
        ],
      },
      {
        h: '三种必须保留 will 的情况',
        body: '第一，when 或 if 引导的不是状语从句而是宾语从句时，将来意义照常用 will。第二，从句里的 will 不表将来而表“愿意、偏要”，这时也不能改成现在时。第三，宾语从句里的“是否”由 whether 或 if 承担，它本来就与主将从现无关。',
        examples: [
          { en: 'Nobody knows whether the match will be put off by the rain.', zh: '没人知道比赛会不会因为下雨而推迟。' },
          { en: 'If you will keep talking in class, at least talk in a lower voice.', zh: '你偏要在课上讲话，那至少把声音放低些。' },
        ],
      },
      {
        h: '宾语从句的时态呼应与例外',
        body: '主句是过去时，从句要往后退一档：一般现在时变一般过去时，现在完成时变过去完成时，will 变 would。例外是客观真理和科学事实，永远用一般现在时。如果从句说的情况到现在仍然成立，也常用现在时而不退。',
        examples: [
          { en: 'Our teacher told us ten years ago that light travels much faster than sound.', zh: '十年前老师就告诉过我们，光比声音快得多。' },
          { en: 'Kate said she would return my dictionary as soon as she finished the paper.', zh: '凯特说论文一写完就把我的词典还给我。' },
        ],
      },
    ],
    keyPoints: [
      'as soon as、until、unless 从句填一般现在时表将来',
      '从句主语是动作承受者，填一般现在时被动，如 are approved',
      '主句过去时从句退一档：will 变 would，现在完成变过去完成',
      '客观真理不受主句过去时影响，earth is round 永远用一般现在时',
    ],
    pitfall: '看到 when 就套主将从现最容易翻车：Do you know when he will arrive? 里的 when 从句是宾语从句，will 不能改成 arrives。同理 if 表“是否”时也保留 will：I wonder if it will snow tomorrow.',
    quiz: [
      {
        q: 'I ____ you the moment the results come out.',
        opts: ['will tell', 'tell', 'told', 'would tell'],
        a: 0,
        explain: 'the moment 引导时间状语从句，从句里已用 comes 表将来，将来意义落在主句的 will tell 上。',
      },
      {
        q: 'Unless the weather ____, the rowing lesson will start at four as usual.',
        opts: ['will change', 'changed', 'changes', 'is changing'],
        a: 2,
        explain: 'unless 条件从句里用一般现在时代替将来，主语 the weather 是第三人称单数，用 changes。',
      },
      {
        q: 'Nobody knew at that time whether the plan ____ in the end.',
        opts: ['will succeed', 'would succeed', 'succeeds', 'had succeeded'],
        a: 1,
        explain: 'whether 引导的是宾语从句，不受主将从现限制；主句 knew 是过去，从句从过去看将来用 would succeed。',
      },
      {
        q: 'Twenty years ago our geography teacher told us that the earth ____ round.',
        opts: ['was', 'had been', 'would be', 'is'],
        a: 3,
        explain: '客观真理不受主句过去时的影响，永远用一般现在时 is。',
      },
      {
        q: 'The new rules will come into force as soon as they ____ by the school board next week.',
        opts: ['approved', 'will be approved', 'approve', 'are approved'],
        a: 3,
        explain: 'as soon as 从句不写 will；规则是“被批准”的，用一般现在时的被动 are approved。',
      },
      {
        q: 'Could you tell me if your cousin ____ to the summer camp next week?',
        opts: ['goes', 'went', 'will go', 'go'],
        a: 2,
        explain: 'if 在这句里是“是否”，引导宾语从句而不是条件从句，下周的事要用 will go。',
      },
    ],
  },
];

export const grammarById = Object.fromEntries(grammarLessons.map((lesson) => [lesson.id, lesson]));
