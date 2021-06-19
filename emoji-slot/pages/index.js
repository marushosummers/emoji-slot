import Head from 'next/head'
import styles from '../src/styles/Home.module.css'
import Slot from '../src/components/Slot'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import queryString from "query-string";

export default function Home() {
  const router = useRouter();

	useEffect(() => {
		router.query = queryString.parse(router.asPath.split(/\?/)[1]);
		console.log(router.asPath);
	}, [router.asPath]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Emoji Slot</title>
				<meta charSet="utf-8" />
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎰</text></svg>"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#f7f7f7" />
				<meta name="description" content="Emoji Slot Machine" />
				<meta property="og:site_name" content="Emoji Slot" />
				<meta
					property="og:image"
					content={`https://emoji-slot.marusho.io/api/ogp?p1=${router.query.p1}&p2=${router.query.p2}&p3=${router.query.p3}`}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Emoji Slot" />
				<meta name="twitter:description" content="Emoji Slot" />
				<meta
					property="twitter:image"
					content={`https://emoji-slot.marusho.io/api/ogp?p1=${router.query.p1}&p2=${router.query.p2}&p3=${router.query.p3}`}
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
						<div role="img" aria-labelledby="image-1">
							🦊
						</div>
					</span>
				</a>
			</footer>
		</div>
	);
}
