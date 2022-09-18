import { mount } from "@cypress/react";
import Movies from "../../pages";

const MoviesData = {
    data: {
        page: 1,
        results: [
            {
                adult: false,
                backdrop_path: "/2RSirqZG949GuRwN38MYCIGG4Od.jpg",
                genre_ids: [53],
                id: 985939,
                original_language: "en",
                original_title: "Fall",
                overview:
                    "For best friends Becky and Hunter, life is all about conquering fears and pushing limits. But after they climb 2,000 feet to the top of a remote, abandoned radio tower, they find themselves stranded with no way down. Now Becky and Hunter’s expert climbing skills will be put to the ultimate test as they desperately fight to survive the elements, a lack of supplies, and vertigo-inducing heights",
                popularity: 9320.962,
                poster_path: "/9f5sIJEgvUpFv0ozfA6TurG4j22.jpg",
                release_date: "2022-08-11",
                title: "Fall",
                video: false,
                vote_average: 7.4,
                vote_count: 658,
            },
            {
                adult: false,
                backdrop_path: "/nnUQqlVZeEGuCRx8SaoCU4XVHJN.jpg",
                genre_ids: [14, 12, 10751],
                id: 532639,
                original_language: "en",
                original_title: "Pinocchio",
                overview: "A wooden puppet embarks on a thrilling adventure to become a real boy.",
                popularity: 7483.014,
                poster_path: "/h32gl4a3QxQWNiNaR4Fc1uvLBkV.jpg",
                release_date: "2022-09-07",
                title: "Pinocchio",
                video: false,
                vote_average: 6.8,
                vote_count: 489,
            },
        ],
    },
};

let data = {};

describe("<Movies/>", () => {
    beforeEach(() => {
        cy.request("http://localhost:3000/api/movies", { page: 1 }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.results.length).eq(20);
            data = response.body;
        });
        mount(<Movies data={data} />);
    });
    it("should render table header", () => {
        cy.get("th").contains("Name");
        cy.get("th").contains("Language");
        cy.get("th").contains("Release Date");
        cy.get("th").contains("Popularity");
        cy.get("th").contains("Adult");
    });
    it("should render movies list", () => {
        //1st row
        cy.get("tr").contains("Fall");
        cy.get("tr").contains("en");
        cy.get("tr").contains("2022-08-11");
        cy.get("tr").contains("9320.962");
        cy.get("tr").contains("No");
        //2nd row
        cy.get("tr").contains("Pinocchio");
        cy.get("tr").contains("en");
        cy.get("tr").contains("2022-09-07");
        cy.get("tr").contains("7483.014");
        cy.get("tr").contains("No");
    });
});
