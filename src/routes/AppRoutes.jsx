import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Trash from "../pages/Trash";
import Albums from "../pages/Albums";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/trash" element={<Trash />} />
            </Route>
        </Routes>
    );
}
