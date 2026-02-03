{
  description = "Eleventy site";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs";

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      packages.${system}.default = pkgs.buildNpmPackage {
        pname = "eleventy-site";
        version = "1.0.0";
        src = ./.;

        # 1. Run 'nix build'
        # 2. It will fail and give you a hash
        # 3. Replace this string with that hash
        npmDepsHash = "sha256-ku9oVBR9A6ex6oBrFybJCWehzUq3a/K83vsriikdfDw=";

        installPhase = ''
          npx @11ty/eleventy
          # cp -r _site $out
        '';
      };

      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_20
        ];
      };
    };
}
