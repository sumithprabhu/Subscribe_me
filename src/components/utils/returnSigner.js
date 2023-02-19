import { useWeb3React } from "@web3-react/core";

const returnSigner=()=>{
    const { account, library, chainId } = useWeb3React();
    const signer = library.getSigner();
    return
    (
        
    )
}
export default returnSigner;


