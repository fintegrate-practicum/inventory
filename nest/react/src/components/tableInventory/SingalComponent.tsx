import Details from "./Details";
interface Component {
    name: string;
    price: number;

}
interface SingalComponentProps {
    componentOne: Component;
}
const SingalCmponent: React.FunctionComponent<SingalComponentProps> = ({ componentOne }) => {
    return (
        <>
            <p>{componentOne.name}</p>
            {/* <Details/> */}

        </>
    );
}

export default SingalCmponent;