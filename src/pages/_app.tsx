import Layout from '@/components/Common/Layout';
import '@/styles/globals.css';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
	[polygonMumbai],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: 'My APP',
	projectId: 'YOUR_PROJECT_ID',
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const myCache = createEmotionCache({ key: 'mantine' });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider theme={{ fontFamily: 'Open Sans' }} withGlobalStyles withNormalizeCSS emotionCache={myCache}>
			<div className="bg-gray-50">
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains} modalSize="compact">
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</RainbowKitProvider>
				</WagmiConfig>

				<Toaster />
			</div>
		</MantineProvider>
	);
}
