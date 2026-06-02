import balancaImg from "../public/slothBeeBalanca.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"

const STORAGE_KEY = "slothBeeBlogPosts"

export const defaultBlogPosts = [
  {
    id: "agua",
    category: "Saude",
    title: "Importancia de beber agua",
    summary: "Manter-se hidratado traz inumeros beneficios para o corpo e para a mente.",
    image: plantinhaImg,
    imageBg: "bg-[#dff4f7]",
    content: [
      "A agua ajuda o corpo a regular a temperatura, transportar nutrientes e manter a energia durante o dia.",
      "Quando a rotina fica corrida, e comum esquecer pequenas pausas. Um copo de agua pode funcionar como um lembrete gentil para respirar e voltar ao foco.",
      "Criar uma meta simples, como beber agua ao iniciar uma sessao de foco, transforma cuidado em habito.",
    ],
    tips: ["Deixe uma garrafa visivel na mesa.", "Beba agua ao iniciar e encerrar uma tarefa.", "Observe sinais de sede antes do cansaco chegar."],
  },
  {
    id: "movimento",
    category: "Movimento",
    title: "Praticar exercicios no dia a dia",
    summary: "Pequenas atitudes diarias podem melhorar sua disposicao, reduzir estresse e aumentar sua produtividade.",
    image: mascoteImg,
    imageBg: "bg-[#dff2dc]",
    content: [
      "Movimento nao precisa ser complicado. Alongar os ombros, caminhar por alguns minutos ou levantar da cadeira ja muda a qualidade do dia.",
      "O corpo parado por muito tempo tende a deixar a mente mais cansada. Pausas ativas ajudam a renovar a atencao.",
      "O segredo e escolher uma acao pequena o suficiente para caber na rotina sem virar peso.",
    ],
    tips: ["Alongue o pescoco entre tarefas.", "Caminhe por cinco minutos depois do almoco.", "Use metas pequenas para manter constancia."],
  },
  {
    id: "telas",
    category: "Saude mental",
    title: "Uso excessivo de telas",
    summary: "Entenda os impactos do tempo de tela em sua saude mental e descubra dicas para uma relacao mais equilibrada.",
    image: mascoteAlmofadaImg,
    imageBg: "bg-[#ffe5da]",
    content: [
      "As telas fazem parte do trabalho e do descanso, mas o uso sem pausa pode aumentar cansaco visual, ansiedade e dificuldade para dormir.",
      "Separar momentos sem notificacoes ajuda o cerebro a desacelerar e recuperar energia.",
      "Uma rotina equilibrada nao elimina tecnologia; ela cria limites para que a tecnologia trabalhe a favor do bem-estar.",
    ],
    tips: ["Desative notificacoes durante o foco.", "Evite tela intensa antes de dormir.", "Troque uma pausa de rolagem por uma pausa de respiracao."],
  },
  {
    id: "alimentacao",
    category: "Nutricao",
    title: "Alimentacao saudavel para foco",
    summary: "Alimentos certos ajudam a melhorar a concentracao, a memoria e o bem-estar ao longo do dia.",
    image: balancaImg,
    imageBg: "bg-[#e8f5d6]",
    content: [
      "Comer bem durante o dia ajuda a evitar quedas bruscas de energia e melhora a clareza mental.",
      "Pratos simples com fibras, proteinas e alimentos frescos sustentam melhor o foco do que escolhas muito pesadas ou cheias de acucar.",
      "Planejar pequenos lanches tambem reduz decisoes impulsivas quando o cansaco aparece.",
    ],
    tips: ["Inclua frutas ou castanhas nos intervalos.", "Evite longos periodos sem comer.", "Prefira refeicoes leves antes de tarefas importantes."],
  },
]

function normalizePost(post) {
  return {
    ...post,
    image: post.image || plantinhaImg,
    imageBg: post.imageBg || "bg-[#dff4f7]",
    content: Array.isArray(post.content) && post.content.length ? post.content : [post.summary],
    tips:
      Array.isArray(post.tips) && post.tips.length
        ? post.tips
        : ["Leia com calma.", "Escolha uma acao pequena para hoje.", "Volte quando precisar revisar a dica."],
  }
}

function readStoredPosts() {
  try {
    const storedPosts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    return Array.isArray(storedPosts) ? storedPosts.map(normalizePost) : []
  } catch {
    return []
  }
}

function saveStoredPosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.map(normalizePost)))
}

function createPostId(title) {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  return `${slug || "blog"}-${Date.now()}`
}

export function getBlogPosts() {
  return [...readStoredPosts(), ...defaultBlogPosts]
}

export function addBlogPost({ title, category, summary }) {
  const newPost = normalizePost({
    id: createPostId(title),
    title,
    category,
    summary,
    image: plantinhaImg,
    imageBg: "bg-[#dff4f7]",
    content: [summary],
    tips: ["Leia com calma.", "Escolha uma acao pequena para hoje.", "Volte quando precisar revisar a dica."],
  })

  const storedPosts = [newPost, ...readStoredPosts()]
  saveStoredPosts(storedPosts)
  return newPost
}

export function deleteBlogPost(id) {
  const storedPosts = readStoredPosts().filter((post) => post.id !== id)
  saveStoredPosts(storedPosts)
}
