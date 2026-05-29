import { useState } from "react"
import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import BlogConteudo from "./BlogConteudo.jsx"
import { AppFrame, Icon, Logo } from "./shared.jsx"

const blogPosts = [
  {
    id: "agua",
    category: "Saúde",
    title: "Importância de beber água",
    summary: "Manter-se hidratado traz inúmeros benefícios para o corpo e para a mente.",
    image: plantinhaImg,
    imageBg: "bg-[#dff4f7]",
    content: [
      "A água ajuda o corpo a regular a temperatura, transportar nutrientes e manter a energia durante o dia.",
      "Quando a rotina fica corrida, é comum esquecer pequenas pausas. Um copo de água pode funcionar como um lembrete gentil para respirar e voltar ao foco.",
      "Criar uma meta simples, como beber água ao iniciar uma sessão de foco, transforma cuidado em hábito.",
    ],
    tips: ["Deixe uma garrafa visível na mesa.", "Beba água ao iniciar e encerrar uma tarefa.", "Observe sinais de sede antes do cansaço chegar."],
  },
  {
    id: "movimento",
    category: "Movimento",
    title: "Praticar exercícios no dia a dia",
    summary: "Pequenas atitudes diárias podem melhorar sua disposição, reduzir estresse e aumentar sua produtividade.",
    image: mascoteImg,
    imageBg: "bg-[#dff2dc]",
    content: [
      "Movimento não precisa ser complicado. Alongar os ombros, caminhar por alguns minutos ou levantar da cadeira já muda a qualidade do dia.",
      "O corpo parado por muito tempo tende a deixar a mente mais cansada. Pausas ativas ajudam a renovar a atenção.",
      "O segredo é escolher uma ação pequena o suficiente para caber na rotina sem virar peso.",
    ],
    tips: ["Alongue o pescoço entre tarefas.", "Caminhe por cinco minutos depois do almoço.", "Use metas pequenas para manter constância."],
  },
  {
    id: "telas",
    category: "Saúde mental",
    title: "Uso excessivo de telas",
    summary: "Entenda os impactos do tempo de tela em sua saúde mental e descubra dicas para uma relação mais equilibrada.",
    image: mascoteAlmofadaImg,
    imageBg: "bg-[#ffe5da]",
    content: [
      "As telas fazem parte do trabalho e do descanso, mas o uso sem pausa pode aumentar cansaço visual, ansiedade e dificuldade para dormir.",
      "Separar momentos sem notificações ajuda o cérebro a desacelerar e recuperar energia.",
      "Uma rotina equilibrada não elimina tecnologia; ela cria limites para que a tecnologia trabalhe a favor do bem-estar.",
    ],
    tips: ["Desative notificações durante o foco.", "Evite tela intensa antes de dormir.", "Troque uma pausa de rolagem por uma pausa de respiração."],
  },
  {
    id: "alimentacao",
    category: "Nutrição",
    title: "Alimentação saudável para foco",
    summary: "Alimentos certos ajudam a melhorar a concentração, a memória e o bem-estar ao longo do dia.",
    image: balancaImg,
    imageBg: "bg-[#e8f5d6]",
    content: [
      "Comer bem durante o dia ajuda a evitar quedas bruscas de energia e melhora a clareza mental.",
      "Pratos simples com fibras, proteínas e alimentos frescos sustentam melhor o foco do que escolhas muito pesadas ou cheias de açúcar.",
      "Planejar pequenos lanches também reduz decisões impulsivas quando o cansaço aparece.",
    ],
    tips: ["Inclua frutas ou castanhas nos intervalos.", "Evite longos períodos sem comer.", "Prefira refeições leves antes de tarefas importantes."],
  },
]

function BlogCard({ post, onRead }) {
  return (
    <article className="grid gap-4 rounded-sm bg-white p-3 shadow-sm sm:grid-cols-[120px_1fr_auto] sm:items-center">
      <div className={`flex h-28 items-center justify-center rounded-sm ${post.imageBg}`}>
        <img src={post.image} alt="" className="h-24 w-24 object-contain" />
      </div>

      <div>
        <span className="inline-flex rounded-sm bg-[#dff0c8] px-2 py-1 text-[10px] font-black uppercase text-[#4f8236]">
          {post.category}
        </span>
        <h2 className="mt-2 text-base font-black text-[#263d2a]">{post.title}</h2>
        <p className="mt-1 text-[12px] font-bold leading-snug text-[#6c6b5f]">{post.summary}</p>
      </div>

      <button
        type="button"
        onClick={() => onRead(post)}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-[#5d8f44] px-4 text-[12px] font-black text-white"
      >
        Ler mais
        <Icon className="h-4 w-4" name="arrowRight" />
      </button>
    </article>
  )
}

function BlogList({ onRead }) {
  return (
    <section className="min-h-[calc(100vh-1rem)] rounded-sm bg-[#fffdf5] p-5 shadow-sm lg:col-span-2">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <header className="mb-5 flex items-center gap-4">
            <img src={mascoteAlmofadaImg} alt="" className="hidden h-24 w-24 object-contain sm:block" />
            <div className="min-w-0">
              <Logo />
              <h1 className="mt-2 text-3xl font-black text-[#263d2a]">
                Blog do <span className="text-[#5f8f34]">Sloth</span>
                <span className="text-[#f2b52f]">Bee</span>
              </h1>
              <p className="mt-1 text-sm font-bold text-[#6c6b5f]">
                Dicas e conteúdos para uma vida mais leve, saudável e equilibrada.
              </p>
            </div>
            <img src={abelhaImg} alt="" className="ml-auto h-16 w-16 object-contain" />
          </header>

          <div className="space-y-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} onRead={onRead} />
            ))}
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <section className="rounded-sm border border-[#f4d782] bg-white px-5 py-6 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd44a] text-[#8a551f]">
              <Icon className="h-8 w-8" name="chat" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-[#263d2a]">Precisa de ajuda?</h2>
            <p className="mx-auto mt-3 max-w-[220px] text-sm font-bold leading-snug text-[#6c6b5f]">
              Conversar com um profissional pode fazer toda a diferença. Você não precisa passar por isso sozinho.
            </p>
            <button
              type="button"
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#5d8f44] px-4 text-[12px] font-black text-white"
            >
              <Icon className="h-4 w-4" name="chat" />
              Falar com profissional
            </button>
            <img src={plantinhaImg} alt="" className="mx-auto mt-5 h-36 w-44 object-contain" />
          </section>

          <section className="grid grid-cols-[56px_1fr] items-center gap-3 rounded-sm bg-white p-4 shadow-sm">
            <img src={mascoteImg} alt="" className="h-14 w-14 object-contain" />
            <div>
              <h2 className="text-sm font-black text-[#5d8f44]">Pequenas escolhas, grandes mudanças</h2>
              <p className="mt-1 text-[12px] font-bold text-[#6c6b5f]">
                Cuide de você, uma dica de cada vez.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}

function Blog({ activePage, onNavigate }) {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <AppFrame activePage={activePage} onNavigate={onNavigate}>
      {selectedPost ? (
        <BlogConteudo post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <BlogList onRead={setSelectedPost} />
      )}
    </AppFrame>
  )
}

export default Blog
