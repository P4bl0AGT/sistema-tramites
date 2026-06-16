# Evidencia de despliegue Docker — Entrega Final

Fecha de ejecucion: 2026-06-16 18:35

## docker compose up --build -d

```
 Image postgres:15-alpine Pulling 
 e7388fabcfc8 Pulling fs layer 0B
 0a8a2f657a65 Pulling fs layer 0B
 fabfbb741253 Pulling fs layer 0B
 6a0ac1617861 Pulling fs layer 0B
 9ba0314f1de5 Pulling fs layer 0B
 0d7083820709 Pulling fs layer 0B
 b4d16d98c9e2 Pulling fs layer 0B
 7a2cc7995f67 Pulling fs layer 0B
 089c22c5ccd1 Pulling fs layer 0B
 875febe691e3 Pulling fs layer 0B
 d5aa5cfeb581 Pulling fs layer 0B
 7cd9452a9126 Download complete 0B
 e7388fabcfc8 Download complete 0B
 c8e31ffa0207 Download complete 0B
 0a8a2f657a65 Download complete 0B
 0d7083820709 Download complete 0B
 fabfbb741253 Download complete 0B
 9ba0314f1de5 Download complete 0B
 b4d16d98c9e2 Downloading 128B
 7a2cc7995f67 Download complete 0B
 089c22c5ccd1 Download complete 0B
 d5aa5cfeb581 Download complete 0B
 b4d16d98c9e2 Download complete 0B
 6a0ac1617861 Downloading 3.146MB
 875febe691e3 Downloading 2.097MB
 6a0ac1617861 Download complete 0B
 6a0ac1617861 Extracting 1B
 875febe691e3 Downloading 5.243MB
 6a0ac1617861 Extracting 1B
 875febe691e3 Downloading 7.34MB
 6a0ac1617861 Extracting 1B
 875febe691e3 Downloading 10.49MB
 0d7083820709 Extracting 1B
 fabfbb741253 Pull complete 0B
 6a0ac1617861 Pull complete 0B
 875febe691e3 Downloading 13.63MB
 0a8a2f657a65 Pull complete 0B
 0d7083820709 Pull complete 0B
 9ba0314f1de5 Pull complete 0B
 875febe691e3 Downloading 15.73MB
 875febe691e3 Downloading 17.83MB
 875febe691e3 Downloading 19.92MB
 875febe691e3 Downloading 22.02MB
 875febe691e3 Downloading 25.17MB
 875febe691e3 Downloading 28.31MB
 875febe691e3 Downloading 32.51MB
 875febe691e3 Downloading 34.6MB
 875febe691e3 Downloading 37.75MB
 875febe691e3 Downloading 40.89MB
 875febe691e3 Downloading 42.99MB
 875febe691e3 Downloading 47.19MB
 875febe691e3 Downloading 50.33MB
 875febe691e3 Downloading 52.43MB
 875febe691e3 Downloading 56.62MB
 875febe691e3 Downloading 58.72MB
 875febe691e3 Downloading 60.82MB
 875febe691e3 Downloading 62.91MB
 875febe691e3 Downloading 66.06MB
 875febe691e3 Downloading 68.16MB
 875febe691e3 Downloading 71.3MB
 875febe691e3 Downloading 73.4MB
 875febe691e3 Downloading 76.55MB
 875febe691e3 Downloading 79.69MB
 875febe691e3 Downloading 81.79MB
 875febe691e3 Downloading 83.89MB
 875febe691e3 Downloading 85.98MB
 875febe691e3 Downloading 89.13MB
 875febe691e3 Downloading 91.23MB
 875febe691e3 Downloading 94.37MB
 875febe691e3 Downloading 96.47MB
 875febe691e3 Downloading 99.61MB
 875febe691e3 Downloading 102.8MB
 875febe691e3 Downloading 104.4MB
 875febe691e3 Download complete 0B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 1B
 875febe691e3 Extracting 2B
 875febe691e3 Extracting 2B
 875febe691e3 Extracting 2B
 875febe691e3 Extracting 2B
 875febe691e3 Extracting 2B
 875febe691e3 Extracting 2B
 875febe691e3 Extracting 2B
 875febe691e3 Pull complete 0B
 7a2cc7995f67 Pull complete 0B
 089c22c5ccd1 Pull complete 0B
 d5aa5cfeb581 Pull complete 0B
 b4d16d98c9e2 Pull complete 0B
 e7388fabcfc8 Pull complete 0B
 Image postgres:15-alpine Pulled 
 Image sistema-tramites-frontend Building 
 Image sistema-tramites-api Building 
#1 [internal] load local bake definitions
#1 reading from stdin 1.16kB 0.0s done
#1 DONE 0.0s

#2 [api internal] load build definition from Dockerfile
#2 transferring dockerfile: 947B 0.0s done
#2 DONE 0.1s

#3 [frontend internal] load build definition from Dockerfile
#3 transferring dockerfile: 639B 0.0s done
#3 DONE 0.1s

#4 [api internal] load metadata for docker.io/library/node:22-alpine
#4 ...

#5 [frontend internal] load metadata for docker.io/library/nginx:1.27-alpine
#5 DONE 1.8s

#4 [frontend internal] load metadata for docker.io/library/node:22-alpine
#4 DONE 1.9s

#6 [frontend internal] load .dockerignore
#6 transferring context: 201B 0.0s done
#6 DONE 0.1s

#7 [api internal] load build context
#7 DONE 0.0s

#8 [frontend internal] load build context
#8 DONE 0.0s

#9 [api deps 1/7] FROM docker.io/library/node:22-alpine@sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd
#9 resolve docker.io/library/node:22-alpine@sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd 0.0s done
#9 resolve docker.io/library/node:22-alpine@sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd 0.0s done
#9 ...

#7 [api internal] load build context
#7 transferring context: 329.90kB 0.2s done
#7 DONE 0.3s

#8 [frontend internal] load build context
#8 transferring context: 738.26kB 0.2s done
#8 DONE 0.4s

#10 [frontend runner 1/3] FROM docker.io/library/nginx:1.27-alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10
#10 resolve docker.io/library/nginx:1.27-alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10 0.0s done
#10 DONE 0.5s

#9 [frontend deps 1/7] FROM docker.io/library/node:22-alpine@sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd
#9 sha256:2b03375268c3aba48c372f5dec52986c73b7798c20e1efa6e51df65416a01487 445B / 445B 0.2s done
#9 sha256:a2a508442c34f2faa2347a0c18e3fa5a9c294dab3d8022f5fd75aff26a054b3e 0B / 1.26MB 0.3s
#9 sha256:55afa1ecc21d2bb5e5045f32dafee56272ffd89860bac26f6c32123439af26a4 0B / 3.85MB 0.2s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 0B / 52.31MB 0.2s
#9 sha256:a2a508442c34f2faa2347a0c18e3fa5a9c294dab3d8022f5fd75aff26a054b3e 1.26MB / 1.26MB 0.5s done
#9 sha256:a2a508442c34f2faa2347a0c18e3fa5a9c294dab3d8022f5fd75aff26a054b3e 1.26MB / 1.26MB 0.5s done
#9 sha256:55afa1ecc21d2bb5e5045f32dafee56272ffd89860bac26f6c32123439af26a4 1.05MB / 3.85MB 0.9s
#9 sha256:55afa1ecc21d2bb5e5045f32dafee56272ffd89860bac26f6c32123439af26a4 3.85MB / 3.85MB 1.2s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 4.19MB / 52.31MB 1.1s
#9 sha256:55afa1ecc21d2bb5e5045f32dafee56272ffd89860bac26f6c32123439af26a4 3.85MB / 3.85MB 1.2s done
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 7.34MB / 52.31MB 1.2s
#9 extracting sha256:55afa1ecc21d2bb5e5045f32dafee56272ffd89860bac26f6c32123439af26a4
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 13.63MB / 52.31MB 1.5s
#9 extracting sha256:55afa1ecc21d2bb5e5045f32dafee56272ffd89860bac26f6c32123439af26a4 0.3s done
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 17.83MB / 52.31MB 1.7s
#9 extracting sha256:55afa1ecc21d2bb5e5045f32dafee56272ffd89860bac26f6c32123439af26a4 0.3s done
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 20.97MB / 52.31MB 1.8s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 28.31MB / 52.31MB 2.1s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 32.51MB / 52.31MB 2.3s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 36.70MB / 52.31MB 2.4s
#9 ...

#10 [frontend runner 1/3] FROM docker.io/library/nginx:1.27-alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10
#10 sha256:39c2ddfd6010082a4a646e7ca44e95aca9bf3eaebc00f17f7ccc2954004f2a7d 15.52MB / 15.52MB 1.3s done
#10 sha256:34a64644b756511a2e217f0508e11d1a572085d66cd6dc9a555a082ad49a3102 1.40kB / 1.40kB 0.3s done
#10 sha256:197eb75867ef4fcecd4724f17b0972ab0489436860a594a9445f8eaff8155053 1.21kB / 1.21kB 0.2s done
#10 sha256:81bd8ed7ec6789b0cb7f1b47ee731c522f6dba83201ec73cd6bca1350f582948 402B / 402B 0.2s done
#10 sha256:d7e5070240863957ebb0b5a44a5729963c3462666baa2947d00628cb5f2d5773 955B / 955B 0.2s done
#10 sha256:b464cfdf2a6319875aeb27359ec549790ce14d8214fcb16ef915e4530e5ed235 629B / 629B 0.3s done
#10 sha256:61ca4f733c802afd9e05a32f0de0361b6d713b8b53292dc15fb093229f648674 1.79MB / 1.79MB 0.6s done
#10 sha256:f18232174bc91741fdf3da96d85011092101a032a93a388b79e99e69c2d5c870 3.64MB / 3.64MB 0.5s done
#10 extracting sha256:f18232174bc91741fdf3da96d85011092101a032a93a388b79e99e69c2d5c870 0.2s done
#10 extracting sha256:61ca4f733c802afd9e05a32f0de0361b6d713b8b53292dc15fb093229f648674 0.3s done
#10 extracting sha256:b464cfdf2a6319875aeb27359ec549790ce14d8214fcb16ef915e4530e5ed235 0.0s done
#10 extracting sha256:d7e5070240863957ebb0b5a44a5729963c3462666baa2947d00628cb5f2d5773 0.0s done
#10 DONE 2.9s

#9 [frontend deps 1/7] FROM docker.io/library/node:22-alpine@sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 40.89MB / 52.31MB 2.6s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 46.14MB / 52.31MB 2.7s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 51.38MB / 52.31MB 2.8s
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 52.31MB / 52.31MB 3.0s done
#9 ...

#10 [frontend runner 1/3] FROM docker.io/library/nginx:1.27-alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10
#10 extracting sha256:81bd8ed7ec6789b0cb7f1b47ee731c522f6dba83201ec73cd6bca1350f582948 0.0s done
#10 extracting sha256:197eb75867ef4fcecd4724f17b0972ab0489436860a594a9445f8eaff8155053 0.0s done
#10 extracting sha256:34a64644b756511a2e217f0508e11d1a572085d66cd6dc9a555a082ad49a3102 0.0s done
#10 extracting sha256:39c2ddfd6010082a4a646e7ca44e95aca9bf3eaebc00f17f7ccc2954004f2a7d 0.5s done
#10 DONE 3.5s

#9 [api deps 1/7] FROM docker.io/library/node:22-alpine@sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd
#9 sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 52.31MB / 52.31MB 3.0s done
#9 extracting sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54
#9 ...

#11 [frontend runner 2/3] COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
#11 DONE 0.5s

#9 [api deps 1/7] FROM docker.io/library/node:22-alpine@sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd
#9 extracting sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 1.5s done
#9 extracting sha256:6f79f5d7e8a5afbeb2462a07a3e3f1b9e2c137f153b24ab9ee8f9f3a29fc9f54 1.5s done
#9 extracting sha256:a2a508442c34f2faa2347a0c18e3fa5a9c294dab3d8022f5fd75aff26a054b3e 0.1s done
#9 extracting sha256:2b03375268c3aba48c372f5dec52986c73b7798c20e1efa6e51df65416a01487 0.0s done
#9 DONE 4.9s

#12 [frontend build 2/7] WORKDIR /app
#12 DONE 0.1s

#13 [api deps 2/7] RUN apk add --no-cache openssl
#13 ...

#14 [frontend build 3/7] COPY pnpm-lock.yaml pnpm-workspace.yaml ./
#14 DONE 0.1s

#15 [frontend build 4/7] COPY frontend/package.json ./frontend/package.json
#15 DONE 0.1s

#16 [frontend build 5/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir frontend install --frozen-lockfile
#16 0.424 Preparing pnpm@11.4.0 for immediate activation...
#16 ...

#13 [api deps 2/7] RUN apk add --no-cache openssl
#13 2.066 (1/1) Installing openssl (3.5.7-r0)
#13 2.105 Executing busybox-1.37.0-r31.trigger
#13 2.116 OK: 11.6 MiB in 19 packages
#13 DONE 2.2s

#17 [api runner 2/8] RUN apk add --no-cache openssl
#17 2.041 (1/1) Installing openssl (3.5.7-r0)
#17 2.066 Executing busybox-1.37.0-r31.trigger
#17 2.076 OK: 11.6 MiB in 19 packages
#17 DONE 2.2s

#18 [api deps 3/7] WORKDIR /app
#18 DONE 0.1s

#19 [api runner 3/8] WORKDIR /app
#19 DONE 0.1s

#16 [frontend build 5/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir frontend install --frozen-lockfile
#16 ...

#20 [api deps 4/7] COPY pnpm-lock.yaml pnpm-workspace.yaml ./
#20 DONE 0.1s

#21 [api deps 5/7] COPY backend/package.json ./backend/package.json
#21 DONE 0.1s

#22 [api deps 6/7] COPY backend/prisma/schema.prisma ./backend/prisma/schema.prisma
#22 DONE 0.1s

#23 [api deps 7/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend install --frozen-lockfile
#23 0.427 Preparing pnpm@11.4.0 for immediate activation...
#23 2.554 ? Verifying lockfile against supply-chain policies (876 entries)...
#23 3.332 
#23 3.332    Ôò¡ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔò«
#23 3.332    Ôöé                                              Ôöé
#23 3.332    Ôöé      Update available! 11.4.0 ÔåÆ 11.7.0.      Ôöé
#23 3.332    Ôöé     Changelog: https://pnpm.io/v/11.7.0      Ôöé
#23 3.332    Ôöé   To update, run: corepack use pnpm@11.7.0   Ôöé
#23 3.332    Ôöé                                              Ôöé
#23 3.332    Ôò░ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔò»
#23 3.332 
#23 ...

#16 [frontend build 5/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir frontend install --frozen-lockfile
#16 3.152 ? Verifying lockfile against supply-chain policies (876 entries)...
#16 3.731 
#16 3.731    Ôò¡ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔò«
#16 3.731    Ôöé                                              Ôöé
#16 3.731    Ôöé      Update available! 11.4.0 ÔåÆ 11.7.0.      Ôöé
#16 3.731    Ôöé     Changelog: https://pnpm.io/v/11.7.0      Ôöé
#16 3.731    Ôöé   To update, run: corepack use pnpm@11.7.0   Ôöé
#16 3.731    Ôöé                                              Ôöé
#16 3.731    Ôò░ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔò»
#16 3.731 
#16 13.07 Ô£ô Lockfile passes supply-chain policies (876 entries in 9.9s)
#16 13.14 ..                                       | Progress: resolved 1, reused 0, downloaded 0, added 0
#16 13.30 ..                                       | +731 ++++++++++++++++++++++++++++++++
#16 14.14 ..                                       | Progress: resolved 731, reused 0, downloaded 35, added 0
#16 ...

#23 [api deps 7/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend install --frozen-lockfile
#23 12.20 Ô£ô Lockfile passes supply-chain policies (876 entries in 9.6s)
#23 12.24 ..                                       | Progress: resolved 1, reused 0, downloaded 0, added 0
#23 12.32 ..                                       | +115 ++++++++++++
#23 13.25 ..                                       | Progress: resolved 115, reused 0, downloaded 80, added 24
#23 14.26 ..                                       | Progress: resolved 115, reused 0, downloaded 110, added 62
#23 17.83 ..                                       | Progress: resolved 115, reused 0, downloaded 110, added 63
#23 18.83 ..                                       | Progress: resolved 115, reused 0, downloaded 114, added 93
#23 19.40 ..                                       | Progress: resolved 115, reused 0, downloaded 115, added 115, done
#23 19.60 .../node_modules/@prisma/engines postinstall$ node scripts/postinstall.js
#23 21.24 .../node_modules/@prisma/engines postinstall: Done
#23 21.36 .../prisma@5.22.0/node_modules/prisma preinstall$ node scripts/preinstall-entry.js
#23 21.43 .../prisma@5.22.0/node_modules/prisma preinstall: Done
#23 21.50 .../node_modules/@prisma/client postinstall$ node scripts/postinstall.js
#23 22.15 .../node_modules/@prisma/client postinstall: prisma:warn We could not find your Prisma schema in the default locations (see: https://pris.ly/d/prisma-schema-location).
#23 22.15 .../node_modules/@prisma/client postinstall: If you have a Prisma schema file in a custom path, you will need to run
#23 22.15 .../node_modules/@prisma/client postinstall: `prisma generate --schema=./path/to/your/schema.prisma` to generate Prisma Client.
#23 22.15 .../node_modules/@prisma/client postinstall: If you do not have a Prisma schema file yet, you can ignore this message.
#23 22.17 .../node_modules/@prisma/client postinstall: Done
#23 ...

#16 [frontend build 5/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir frontend install --frozen-lockfile
#16 15.19 ..                                       | Progress: resolved 731, reused 0, downloaded 140, added 0
#16 17.35 ..                                       | Progress: resolved 731, reused 0, downloaded 264, added 19
#16 20.02 ..                                       | Progress: resolved 731, reused 0, downloaded 264, added 20
#16 21.02 ..                                       | Progress: resolved 731, reused 0, downloaded 277, added 23
#16 22.04 ..                                       | Progress: resolved 731, reused 0, downloaded 448, added 62
#16 23.04 ..                                       | Progress: resolved 731, reused 0, downloaded 730, added 252
#16 24.04 ..                                       | Progress: resolved 731, reused 0, downloaded 731, added 730
#16 ...

#23 [api deps 7/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend install --frozen-lockfile
#23 28.02 
#23 28.02 dependencies:
#23 28.02 + @prisma/client 5.22.0
#23 28.02 + bcryptjs 2.4.3
#23 28.02 + cors 2.8.6
#23 28.02 + dotenv 16.6.1
#23 28.02 + express 4.22.2
#23 28.02 + express-rate-limit 8.5.2
#23 28.02 + helmet 8.2.0
#23 28.02 + jsonwebtoken 9.0.3
#23 28.02 + multer 1.4.5-lts.2
#23 28.02 + prisma 5.22.0
#23 28.02 + xss 1.0.15
#23 28.02 
#23 28.04 . postinstall$ prisma generate
#23 28.83 . postinstall: Prisma schema loaded from prisma/schema.prisma
#23 29.41 . postinstall: Ô£ö Generated Prisma Client (v5.22.0) to ./../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client in 137ms
#23 29.41 . postinstall: Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
#23 29.41 . postinstall: Tip: Want to react to database changes in your app as they happen? Discover how with Pulse: https://pris.ly/tip-1-pulse
#23 29.60 . postinstall: Done
#23 29.67 Done in 27.9s using pnpm v11.4.0
#23 ...

#16 [frontend build 5/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir frontend install --frozen-lockfile
#16 30.53 ..                                       | Progress: resolved 731, reused 0, downloaded 731, added 731
#16 30.53 ..                                       | Progress: resolved 731, reused 0, downloaded 731, added 731, done
#16 31.08 .../core-js@3.49.0/node_modules/core-js postinstall$ node -e "try{require('./postinstall')}catch(e){}"
#16 31.11 .../cypress@13.17.0/node_modules/cypress postinstall$ node index.js --exec install
#16 31.13 .../esbuild@0.21.5/node_modules/esbuild postinstall$ node install.js
#16 31.15 .../core-js@3.49.0/node_modules/core-js postinstall: Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!
#16 31.15 .../core-js@3.49.0/node_modules/core-js postinstall: The project needs your help! Please consider supporting core-js:
#16 31.15 .../core-js@3.49.0/node_modules/core-js postinstall: > https://opencollective.com/core-js 
#16 31.15 .../core-js@3.49.0/node_modules/core-js postinstall: > https://patreon.com/zloirock 
#16 31.15 .../core-js@3.49.0/node_modules/core-js postinstall: > https://boosty.to/zloirock 
#16 31.15 .../core-js@3.49.0/node_modules/core-js postinstall: > bitcoin: bc1qlea7544qtsmj2rayg0lthvza9fau63ux0fstcz 
#16 31.15 .../core-js@3.49.0/node_modules/core-js postinstall: I highly recommend reading this: https://github.com/zloirock/core-js/blob/master/docs/2023-02-14-so-whats-next.md 
#16 31.16 .../core-js@3.49.0/node_modules/core-js postinstall: Done
#16 31.23 .../esbuild@0.21.5/node_modules/esbuild postinstall: Done
#16 31.64 .../cypress@13.17.0/node_modules/cypress postinstall: Note: Skipping binary installation: Environment variable CYPRESS_INSTALL_BINARY = 0.
#16 31.67 .../cypress@13.17.0/node_modules/cypress postinstall: Done
#16 38.92 
#16 38.92 dependencies:
#16 38.92 + @capacitor/app 8.1.0
#16 38.92 + @capacitor/core 8.3.3
#16 38.92 + @capacitor/haptics 8.0.2
#16 38.92 + @capacitor/keyboard 8.0.3
#16 38.92 + @capacitor/status-bar 8.0.2
#16 38.92 + @ionic/react 8.8.8
#16 38.92 + @ionic/react-router 8.8.8
#16 38.92 + @types/react-router 5.1.20
#16 38.92 + @types/react-router-dom 5.3.3
#16 38.92 + axios 1.16.1
#16 38.92 + ionicons 7.4.0
#16 38.92 + react 19.0.0
#16 38.92 + react-dom 19.0.0
#16 38.92 + react-router 5.3.4
#16 38.92 + react-router-dom 5.3.4
#16 38.92 
#16 38.92 devDependencies:
#16 38.92 + @capacitor/cli 8.3.3
#16 38.92 + @eslint/js 10.0.1
#16 38.92 + @testing-library/dom 10.4.1
#16 38.92 + @testing-library/jest-dom 5.17.0
#16 38.92 + @testing-library/react 16.3.2
#16 38.92 + @testing-library/user-event 14.6.1
#16 38.92 + @types/react 19.0.10
#16 38.92 + @types/react-dom 19.0.4
#16 38.92 + @vitejs/plugin-legacy 5.4.3
#16 38.92 + @vitejs/plugin-react 4.7.0
#16 38.92 + cypress 13.17.0
#16 38.92 + eslint 9.39.4
#16 38.92 + eslint-plugin-react 7.37.5
#16 38.92 + eslint-plugin-react-hooks 5.2.0
#16 38.92 + eslint-plugin-react-refresh 0.4.26
#16 38.92 + globals 15.15.0
#16 38.92 + jsdom 22.1.0
#16 38.92 + terser 5.48.0
#16 38.92 + typescript 5.9.3
#16 38.92 + typescript-eslint 8.60.1
#16 38.92 + vite 5.4.21
#16 38.92 + vitest 0.34.6
#16 38.92 
#16 39.03 Done in 36.7s using pnpm v11.4.0
#16 DONE 41.2s

#23 [api deps 7/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend install --frozen-lockfile
#23 ...

#24 [frontend build 6/7] COPY frontend ./frontend
#24 ...

#23 [api deps 7/7] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend install --frozen-lockfile
#23 DONE 39.1s

#24 [frontend build 6/7] COPY frontend ./frontend
#24 DONE 3.0s

#24 [frontend build 6/7] COPY frontend ./frontend
#24 DONE 3.0s

#25 [frontend build 7/7] RUN pnpm --dir frontend run build
#25 ...

#26 [api runner 4/8] COPY --from=deps /app/node_modules ./node_modules
#26 DONE 5.0s

#27 [api runner 5/8] COPY --from=deps /app/backend/node_modules ./backend/node_modules
#27 DONE 0.1s

#28 [api runner 6/8] COPY pnpm-lock.yaml pnpm-workspace.yaml ./
#28 DONE 0.1s

#25 [frontend build 7/7] RUN pnpm --dir frontend run build
#25 ...

#29 [api runner 7/8] COPY backend ./backend
#29 DONE 0.1s

#30 [api runner 8/8] RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend exec prisma generate
#30 0.433 Preparing pnpm@11.4.0 for immediate activation...
#30 3.043 Environment variables loaded from .env
#30 3.046 Prisma schema loaded from prisma/schema.prisma
#30 3.381 
#30 3.381 Ô£ö Generated Prisma Client (v5.22.0) to ./../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client in 127ms
#30 3.381 
#30 3.381 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
#30 3.381 
#30 3.381 Tip: Easily identify and fix slow SQL queries in your app. Optimize helps you enhance your visibility: https://pris.ly/--optimize
#30 3.381 
#30 DONE 8.5s

#25 [frontend build 7/7] RUN pnpm --dir frontend run build
#25 3.536 $ tsc && vite build
#25 9.579 vite v5.4.21 building for production...
#25 9.631 transforming...
#25 ...

#31 [api] exporting to image
#31 exporting layers
#31 exporting layers 5.4s done
#31 exporting manifest sha256:20f6c995454d59cead1e6aaed467ddb2f03486e86a0e771910285cb908a1a5fd 0.0s done
#31 exporting config sha256:98b988e34203d55758867c29057278fac8c076d4bd6af061bfc3fde82b761c59 0.0s done
#31 exporting attestation manifest sha256:df8f7826c694a2c884a81fd001387d2a2aa5db5124f4416b56911fa53f0b0a7a 0.0s done
#31 exporting manifest list sha256:80d75697a1de59269db4637197890b9ec0355a6dd325703658db9862e8a2bc6a 0.0s done
#31 naming to docker.io/library/sistema-tramites-api:latest
#31 naming to docker.io/library/sistema-tramites-api:latest done
#31 unpacking to docker.io/library/sistema-tramites-api:latest
#31 unpacking to docker.io/library/sistema-tramites-api:latest 1.6s done
#31 DONE 7.2s

#32 [api] resolving provenance for metadata file
#32 DONE 0.0s

#25 [frontend build 7/7] RUN pnpm --dir frontend run build
#25 12.56 Ô£ô 306 modules transformed.
#25 16.40 rendering chunks...
#25 23.92 computing gzip size...
#25 23.95 dist/assets/p-CneGxKsZ-legacy-CeFgbRbl.js      0.56 kB Ôöé gzip:   0.39 kB
#25 23.95 dist/assets/p-Cz5nLPGT-legacy-vh57V2nW.js      0.76 kB Ôöé gzip:   0.53 kB
#25 23.95 dist/assets/p-CU1SSH8_-legacy-Cq6DwX__.js      1.10 kB Ôöé gzip:   0.61 kB
#25 23.95 dist/assets/p-BgwEQWW6-legacy-DMvbcPfY.js      1.71 kB Ôöé gzip:   0.87 kB
#25 23.95 dist/assets/p-CEmXdzGo-legacy-DTjvI_C8.js      4.95 kB Ôöé gzip:   2.16 kB
#25 23.95 dist/assets/p-CBzELu-H-legacy-D0oV7SkP.js     10.57 kB Ôöé gzip:   3.03 kB
#25 23.95 dist/assets/polyfills-legacy-CLrqZknN.js      57.58 kB Ôöé gzip:  22.90 kB
#25 23.95 dist/assets/index-legacy-07t2Wshr.js       1,467.37 kB Ôöé gzip: 330.25 kB
#25 23.95 
#25 23.95 (!) Some chunks are larger than 500 kB after minification. Consider:
#25 23.95 - Using dynamic import() to code-split the application
#25 23.95 - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
#25 23.95 - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
#25 24.39 dist/index.html                         1.82 kB Ôöé gzip:   0.87 kB
#25 24.39 dist/assets/index-B-RQUHnC.css         34.88 kB Ôöé gzip:   7.49 kB
#25 24.39 dist/assets/p-CneGxKsZ-uluAEQ4d.js      0.47 kB Ôöé gzip:   0.34 kB
#25 24.39 dist/assets/p-Cz5nLPGT-BlHfhjP_.js      0.67 kB Ôöé gzip:   0.47 kB
#25 24.39 dist/assets/p-CU1SSH8_-CdHemBqR.js      1.03 kB Ôöé gzip:   0.56 kB
#25 24.39 dist/assets/p-BgwEQWW6-43RA8xWa.js      1.62 kB Ôöé gzip:   0.83 kB
#25 24.39 dist/assets/p-CEmXdzGo-C581q7R9.js      4.90 kB Ôöé gzip:   2.17 kB
#25 24.39 dist/assets/p-CBzELu-H-Dk8dGeJ2.js     11.04 kB Ôöé gzip:   3.08 kB
#25 24.39 dist/assets/index-DQE5Zay7.js       1,451.72 kB Ôöé gzip: 331.02 kB
#25 24.39 
#25 24.39 (!) Some chunks are larger than 500 kB after minification. Consider:
#25 24.39 - Using dynamic import() to code-split the application
#25 24.39 - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
#25 24.39 - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
#25 24.39 Ô£ô built in 14.78s
#25 DONE 26.8s

#33 [frontend runner 3/3] COPY --from=build /app/frontend/dist /usr/share/nginx/html
#33 DONE 0.8s

#34 [frontend] exporting to image
#34 exporting layers
#34 exporting layers 1.2s done
#34 exporting manifest sha256:ed1e4db5b42fe67516291107e094453affb52b33010c7b848193cb66c00adf02 0.1s done
#34 exporting config sha256:32949050f8a6554277ef3b8609b8861151e9d7206d6e1b5d444d459b3484add4
#34 exporting config sha256:32949050f8a6554277ef3b8609b8861151e9d7206d6e1b5d444d459b3484add4 0.1s done
#34 exporting attestation manifest sha256:d935316f3c91ad77c7d54efc8ad0618db086bd0ffbc5366ef609f3f6a3e2c4b5
#34 exporting attestation manifest sha256:d935316f3c91ad77c7d54efc8ad0618db086bd0ffbc5366ef609f3f6a3e2c4b5 0.2s done
#34 exporting manifest list sha256:51ddf9aabd7db0f9677d538d2002c2b4f991990ff403504cef1cb269d3893eb3
#34 exporting manifest list sha256:51ddf9aabd7db0f9677d538d2002c2b4f991990ff403504cef1cb269d3893eb3 0.1s done
#34 naming to docker.io/library/sistema-tramites-frontend:latest
#34 naming to docker.io/library/sistema-tramites-frontend:latest done
#34 unpacking to docker.io/library/sistema-tramites-frontend:latest
#34 unpacking to docker.io/library/sistema-tramites-frontend:latest 1.2s done
#34 DONE 3.3s

#35 [frontend] resolving provenance for metadata file
#35 DONE 0.0s
 Image sistema-tramites-frontend Built 
 Image sistema-tramites-api Built 
 Network sistema-tramites_default Creating 
 Network sistema-tramites_default Created 
 Volume sistema-tramites_uploads-data Creating 
 Volume sistema-tramites_uploads-data Created 
 Volume sistema-tramites_postgres-data Creating 
 Volume sistema-tramites_postgres-data Created 
 Container tramites-db Creating 
 Container tramites-db Created 
 Container tramites-api Creating 
 Container tramites-api Created 
 Container tramites-frontend Creating 
 Container tramites-frontend Created 
 Container tramites-db Starting 
 Container tramites-db Started 
 Container tramites-db Waiting 
 Container tramites-db Healthy 
 Container tramites-api Starting 
 Container tramites-api Started 
 Container tramites-frontend Starting 
 Container tramites-frontend Started 
```

## docker compose ps

```
NAME                IMAGE                       COMMAND                  SERVICE    CREATED          STATUS                    PORTS
tramites-api        sistema-tramites-api        "docker-entrypoint.sÔÇª"   api        22 seconds ago   Up 10 seconds             0.0.0.0:3001->3001/tcp, [::]:3001->3001/tcp
tramites-db         postgres:15-alpine          "docker-entrypoint.sÔÇª"   db         22 seconds ago   Up 21 seconds (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
tramites-frontend   sistema-tramites-frontend   "/docker-entrypoint.ÔÇª"   frontend   22 seconds ago   Up 10 seconds             0.0.0.0:8100->80/tcp, [::]:8100->80/tcp
```

## Health check API

```
{
  "status": "ok",
  "service": "sistema-tramites-api"
}
```
