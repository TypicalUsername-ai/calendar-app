import FileViewCard from "@/components/Calendar/FileViewCard"
import FileImportCard from "@components/Calendar/FileImportCard"
import { useState } from "react"

export default () => {

    const [files, setFiles] = useState<File[]>([])

    return (
        <div>
            <FileImportCard onFileUpload={(files) => setFiles(files)} />
            {files.map(
                file => <FileViewCard key={file.name + file.size} calendarFile={file} />
            )}
        </div>
    )
}
