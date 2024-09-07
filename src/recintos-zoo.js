class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
        ];

        this.animais = {
            "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };
    }

    podeColocarAnimal(recinto, animal, quantidade) {
        const dadosAnimal = this.animais[animal];
        const espacoNecessario = dadosAnimal.tamanho * quantidade;
        const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * this.animais[a.especie].tamanho), 0);
        const espacoLivre = recinto.tamanho - espacoOcupado;

        if (!dadosAnimal.biomas.includes(recinto.bioma) && recinto.bioma !== "savana e rio") {
            return false;
        }

        if (dadosAnimal.carnivoro && recinto.animais.some(a => a.especie !== animal)) {
            return false;
        }

        // Verifica se o espaço livre é suficiente para os novos animais
        return espacoLivre >= espacoNecessario;
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const recintosViaveis = [];

        for (let recinto of this.recintos) {
            if (this.podeColocarAnimal(recinto, animal, quantidade)) {
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * this.animais[a.especie].tamanho), 0);
                const espacoLivre = recinto.tamanho - espacoOcupado - (this.animais[animal].tamanho * quantidade); // Atualizado

                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoLivre,
                    tamanhoTotal: recinto.tamanho
                });
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        const recintosFormatados = recintosViaveis.map(recinto =>
            `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.tamanhoTotal})`
        );

        return { recintosViaveis: recintosFormatados };
    }
}

export { RecintosZoo as RecintosZoo };
