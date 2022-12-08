import fs from 'fs-extra'

export const copyProject =async (folderpath: string) => {
    const srcDir = folderpath
    const destDir = 'project'
    try {
        //copy contents of end folder structure to project:
        fs.copySync(srcDir, destDir)

    } catch (error) {
        console.log(error, 'invalid folderpath!')
    }
}




