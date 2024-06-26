import FAQItem from "./components/FAQItem";

const FAQ_QUESTIONS = [
	{
		question: "What is Netflix?",
		answer: (
			<>
				<p>
					{`Netflix is a streaming service that offers a wide variety of
					award-winning TV shows, movies, anime, documentaries, and more on
					thousands of internet-connected devices.`}
				</p>
				<p>
					{`You can watch as much as you want, whenever you want – all for one low
					monthly price. There's always something new to discover and new TV
					shows and movies are added every week!`}
				</p>
			</>
		),
	},
	{
		question: "How much does Netflix cost?",
		answer: `Watch Netflix on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from US$6.99 to US$22.99 a month. No extra costs, no contracts.`,
	},
	{
		question: "Where can I watch?",
		answer: (
			<>
				<p>
					{`Watch anywhere, anytime. Sign in with your Netflix account to watch
					instantly on the web at netflix.com from your personal computer or on
					any internet-connected device that offers the Netflix app, including
					smart TVs, smartphones, tablets, streaming media players, and game
					consoles.`}
				</p>
				<p>
					{`You can also download your favourite programmes with the iOS, Android,
					or Windows 10 app. Use downloads to watch while you're on the go and
					without an internet connection. Take Netflix with you anywhere.`}
				</p>
			</>
		),
	},
	{
		question: "How do I cancel?",
		answer: `Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time.`,
	},
	{
		question: "What can I watch on Netflix?",
		answer: `Netflix has an extensive library of feature films, documentaries, TV programmes, anime, award-winning Netflix originals, and more. Watch as much as you want, any time you want.`,
	},
	{
		question: "Is Netflix good for kids?",
		answer: (
			<>
				<p>
					{`The Netflix Children's experience is included in your membership to
					give parents control while children enjoy family-friendly TV
					programmes and films in their own space.`}
				</p>
				<p>
					{`Children's profiles come with PIN-protected parental controls that let
					you restrict the maturity rating of content children can watch and
					block specific titles you don’t want children to see.`}
				</p>
			</>
		),
	},
];

const FAQ = () => {
	return (
		<section
			className="netflix-container mx-auto flex flex-col items-center justify-center px-6 py-20 text-primary-white"
			aria-labelledby="faq-heading"
		>
			<h2
				id="faq-heading"
				className="text-center text-[32px] font-black lg:text-5xl"
			>
				Frequently Asked Questions
			</h2>
			<div className="my-6 w-full">
				<ul className="space-y-2 text-lg lg:text-2xl">
					{FAQ_QUESTIONS.map((faq, index) => (
						<FAQItem key={index} question={faq.question} answer={faq.answer} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default FAQ;
