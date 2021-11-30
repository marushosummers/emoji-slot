import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Slot from '../components/Slot'

export async function getServerSideProps({ query }) {
	return { props: { query } };
}

export default function Home(props) {

	return (
		<div className={styles.container}>
			<Head>
				<title>Emoji Slot</title>
				<meta charSet="utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#f7f7f7" />
				<meta name="keywords" content="emoji, slot, game" />
				<meta name="description" content="Emoji Slot Machine" />
				<meta property="og:site_name" content="Emoji Slot" />
				<meta name="og:title" content="Emoji Slot" />
				<meta name="og:description" content="Emoji Slot" />
				<meta
					property="og:image"
					content={`https://emoji-slot.marusho.io/api/ogp?p1=${
						props.query.p1 ?? "🎰"
					}&p2=${
						props.query.p2 ?? "🎰"
					}&p3=${
						props.query.p3 ?? "🎰"
					}`}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Emoji Slot" />
				<meta name="twitter:description" content="Emoji Slot" />
				<meta
					property="twitter:image"
					content={`https://emoji-slot.marusho.io/api/ogp?p1=${
						props.query.p1 ?? "🎰"
					}&p2=${
						props.query.p2 ?? "🎰"
					}&p3=${
						props.query.p3 ?? "🎰"
					}`}
				/>
			</Head>
			<div className={styles.main}>
				<Slot />
			</div>
			<footer className={styles.footer}>
				<a
					href="https://twitter.com/marusho_summers"
					target="_blank"
					rel="noopener noreferrer"
				>
					Created by{" "}
					<span className={styles.logo}>
						<div role="img" aria-labelledby="marusho">
							🦊
						</div>
					</span>
				</a>
			</footer>
		</div>
	);
}
