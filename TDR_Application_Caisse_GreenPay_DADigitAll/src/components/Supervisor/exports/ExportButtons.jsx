import api from "../../../services/api";
import { Button } from "@heroui/react";

export default function ExportButtons() {

    function exportPdf() {
        window.open(
            `${api.defaults.baseURL}/rapports/export/pdf`,
            "_blank"
        );
    }

    function exportExcel() {
        window.open(
            `${api.defaults.baseURL}/rapports/export/excel`,
            "_blank"
        );
    }

    return (

        <div className="flex gap-3">

            <Button
                color="success"
                onPress={exportExcel}
            >
                Excel
            </Button>

            <Button
                color="primary"
                onPress={exportPdf}
            >
                PDF
            </Button>

        </div>

    );
}