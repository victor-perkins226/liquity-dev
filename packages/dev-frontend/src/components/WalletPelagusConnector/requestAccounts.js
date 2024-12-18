import { quais } from 'quais'

export const requestAccounts = async () => {
	await window.pelagus
		.request({ method: 'quai_requestAccounts' })
		.then((accounts) => {
			const zone = quais.getZoneForAddress(accounts[0])
			const address = {
				shard: zone,
				address: accounts[0],
			}
			// return address
		})
		.catch((error) => {
			if (error.code === 4001) {
				// EIP-1193 userRejectedRequest error
				console.log('User rejected request')
			} else {
				console.error(error)
			}
		})
}


export const isConnected = () => {
	return window.pelagus.isConnected
}