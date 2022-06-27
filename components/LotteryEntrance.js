import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")

    // const {runContractFunction: enterRaffle} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress, //specify the networkId
    //     functionName: "enterRaffle",
    //     params: {},
    //     msg.Value:
    // })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            // try to read the raffle entrance fee
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall, "ether"))
                console.log(entranceFee)
            }
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            Hi from Lottery Entrance <div>Entrance Fee: {entranceFee} ETH</div>
        </div>
    )
}
