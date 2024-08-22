import Header from "./../components/header/header.component";
import Buttons from "./../components/buttons/buttons.component";
import Separator from "./../components/separator/separator.component";
import History from "./../components/history/history.component";
import Camera from "./../components/camera/camera.component";

export default function Home() {
    return (
        <>
            <Header />
            <Separator />
            <Buttons />
            <Separator />
            <History />
        </>
    );
}