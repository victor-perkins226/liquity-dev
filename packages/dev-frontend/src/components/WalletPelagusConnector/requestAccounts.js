import { quais } from 'quais'

export const requestAccounts = async () => {
	await window.pelagus
		.request({ method: 'quai_requestAccounts' })
		.then((accounts) => {
			const zone = quais.getZoneFromAddress(accounts[0])
			const address = {
				shard: shard,
				address: accounts[0],
			}
			console.log('Account:', address)
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