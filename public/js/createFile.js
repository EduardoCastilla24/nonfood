

export function createCardFile(fileName, fileSize, fileIndex, sectionId) {
    document.getElementById(`section_cardFiles${sectionId}`).classList.remove('hidden');

    const cardFileHTML = `
        <div class="cardFile-container flex gap-4 items-center justify-between bg-[#f9f9f9] rounded-xl h-[4.5rem] w-full">
            <div class="flex w-full gap-4 px-4 pr-2 truncate">
                <div class="csv-container flex items-center justify-center w-12 h-12">
                    <svg width="89" height="86" viewBox="0 0 89 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M77 84H33C27.4772 84 23 79.5229 23 74V12C23 6.47715 27.4772 2 33 2H59.6716L87 29.3284V74C87 79.5229 82.5228 84 77 84Z" fill="white" stroke="#CBD0DC" stroke-width="4"/>
                            <rect y="38" width="60" height="35" rx="7" fill="#6A9512"/>
                        <path d="M9.88068 50.3438V48.4545H21.1378V50.3438H16.5994V63H14.4119V50.3438H9.88068ZM25.1523 48.4545L28.6325 54.1435H28.7461L32.2262 48.4545H34.7688L30.2376 55.7273L34.7972 63H32.2404L28.7461 57.3892H28.6325L25.1381 63H22.5813L27.2191 55.7273L22.6097 48.4545H25.1523ZM36.2283 50.3438V48.4545H47.4854V50.3438H42.9471V63H40.7596V50.3438H36.2283Z" fill="white"/>
                    </svg>

                </div>
                <div class="cardFile-head flex flex-col w-full gap-1 pr-2 truncate max-w-[4.5rem]">
                    <h3 class="text-sm font-bold truncate text-black" title="${fileName}">${fileName}</h3>
                    <p class="text-xs text-gray-color">${fileSize} MB</p>
                </div>
            </div>
            <button class="cardFile-delete flex items-center text-lg  justify-center h-full hover:bg-[#f7f7f7] hover:cursor-pointer text-gray-color hover:text-[#e81123] rounded-r-xl w-16" onclick="deleteCardFile(this, ${sectionId})">
                <i class="bx bx-trash"></i>
            </button>

        </div>
    `;

    document.getElementById(`section_cardFiles${sectionId}`).innerHTML = '' ;
    document.getElementById(`section_cardFiles${sectionId}`).innerHTML += cardFileHTML;
}
