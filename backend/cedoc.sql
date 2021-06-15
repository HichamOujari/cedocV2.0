-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 15 juin 2021 à 08:35
-- Version du serveur :  10.4.19-MariaDB
-- Version de PHP : 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cedoc`
--

-- --------------------------------------------------------

--
-- Structure de la table `axe`
--

CREATE TABLE `axe` (
  `id` int(11) NOT NULL,
  `titre` text NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `doctorant`
--

CREATE TABLE `doctorant` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `NumDoss` text NOT NULL,
  `CNE` text NOT NULL,
  `CNI` text NOT NULL,
  `DateNaissance` date NOT NULL,
  `mail` varchar(255) NOT NULL,
  `Tele` int(20) NOT NULL,
  `Bac` text NOT NULL,
  `mention` text NOT NULL,
  `province` text NOT NULL,
  `AnnecBac` text NOT NULL,
  `diplome1` text NOT NULL,
  `SpecialiteDiplome1` text NOT NULL,
  `DateObtentionDip1` date NOT NULL,
  `EtablissementDip1` text NOT NULL,
  `MoyenneDip1` double NOT NULL,
  `MentionDip1` text NOT NULL,
  `diplome2` text DEFAULT NULL,
  `SpecialiteDiplome2` text DEFAULT NULL,
  `DateObtentionDip2` date DEFAULT NULL,
  `EtablissementDip2` text DEFAULT NULL,
  `MoyenneDip2` double DEFAULT NULL,
  `MentionDip2` text DEFAULT NULL,
  `Statut` int(11) NOT NULL,
  `fonction` text DEFAULT NULL,
  `StructureRecherche` int(11) NOT NULL,
  `formation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `data` longtext NOT NULL,
  `idThese` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

CREATE TABLE `enseignant` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `tele` bigint(20) NOT NULL,
  `specialite` text NOT NULL,
  `grade` int(11) NOT NULL,
  `stucture_recherche` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`id`, `nom`, `prenom`, `email`, `tele`, `specialite`, `grade`, `stucture_recherche`) VALUES
(14, 'oujari', 'Hicham', 'hichamoujari99@gmail.com', 212762818251, 'prof agrege', 2, 7),
(15, 'Ahmed', 'Kamal', 'hichamoujari99@gmail.co', 212762818251, 'prof agrege', 2, 7);

-- --------------------------------------------------------

--
-- Structure de la table `etat_inscription`
--

CREATE TABLE `etat_inscription` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etat_inscription`
--

INSERT INTO `etat_inscription` (`id`, `type`) VALUES
(0, 'pre-inscription'),
(1, 'déposition de dossier'),
(2, 'visa structure(OK)'),
(3, 'visa structure(NON)'),
(4, 'inscription(OK)'),
(5, 'inscription(NON)');

-- --------------------------------------------------------

--
-- Structure de la table `grade`
--

CREATE TABLE `grade` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `grade`
--

INSERT INTO `grade` (`id`, `name`) VALUES
(1, 'P.A'),
(2, 'P.H'),
(3, 'P.E.S');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(0, 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `statutdoctorant`
--

CREATE TABLE `statutdoctorant` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `statutdoctorant`
--

INSERT INTO `statutdoctorant` (`id`, `type`) VALUES
(1, 'NON SALARIES'),
(2, 'SALARIES');

-- --------------------------------------------------------

--
-- Structure de la table `structure_recherche`
--

CREATE TABLE `structure_recherche` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `typeStructure` int(11) NOT NULL,
  `acronyme` varchar(255) NOT NULL,
  `dateCreation` date NOT NULL,
  `theme` text NOT NULL,
  `structure_assoc` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `structure_recherche`
--

INSERT INTO `structure_recherche` (`id`, `nom`, `typeStructure`, `acronyme`, `dateCreation`, `theme`, `structure_assoc`) VALUES
(8, 'GÉNIE CIVIL ET CONSTRUCTION', 1, 'GCC', '2021-05-18', '...', 26),
(7, 'RESEAUX INFORMATIQUES, MODELISATION ET ELEARNING', 1, 'RIME', '2021-05-12', '...', NULL),
(9, 'ENERGETIC, MECHANICAL AND INDUSTRIAL SYSTEMS', 1, 'EMISYS', '2021-05-12', '...', NULL),
(10, 'LABORATOIRE DE GÉNIE CIVIL ET ENVIRONNEMENT', 1, 'LGCE', '2021-05-12', '...', NULL),
(12, 'LABORATOIRE D\'ANALYSE DES SYSTEMES, DE TRAITEMENT DE L\'INFORMATION ET DU MANAGEMENT INDUSTRIEL', 1, 'LASTIMI', '2021-05-12', '...', NULL),
(13, 'EQUIPE DE RECHERCHE EN THERMIQUE ET ENERGIE', 1, 'ERTE', '2021-05-12', '...', NULL),
(14, 'IT ARCHITECTURE AND MODEL DRIVEN SYSTEMS DEVELOPMENT', 1, 'IMS', '2021-05-12', '...', NULL),
(15, 'EQUIPE DE RECHERCHE EN ELECTROTECHNIQUE, ROBOTIQUE ET AUTOMATIQUE', 1, 'ERERA', '2021-05-12', '...', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `these`
--

CREATE TABLE `these` (
  `id` int(11) NOT NULL,
  `sujet` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `annee` int(11) NOT NULL,
  `EtatIsncription` int(11) NOT NULL,
  `axe` int(11) DEFAULT NULL,
  `DoctorantID` int(11) DEFAULT NULL,
  `EncadrantID` int(11) DEFAULT NULL,
  `CoEncadrantId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `typestructure`
--

CREATE TABLE `typestructure` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `typestructure`
--

INSERT INTO `typestructure` (`id`, `type`) VALUES
(1, 'equipe'),
(2, 'laboratoire'),
(3, 'centre');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `type` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `type`, `idUser`, `token`) VALUES
(1, 'admin@emi.ac.ma', 'cb60d530016a74a94e36d3375d00b13b', 0, 0, '1623728439156'),
(11, 'hichamoujari99@gmail.com', '3a6919fe4c297c2e4838cf3755702b39', 1, 14, '1623726817268'),
(22, 'hichamoujari99@gmail.co', 'cf2a864b1584bd2ef2cb2fef14c389e3', 2, 15, '1623726847220');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `axe`
--
ALTER TABLE `axe`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctorant`
--
ALTER TABLE `doctorant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `FK_doctorant_structure de recherche` (`StructureRecherche`),
  ADD KEY `FK_doctorant_statutdoctorant_2` (`Statut`);

--
-- Index pour la table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `enseignant`
--
ALTER TABLE `enseignant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FK_enseignant_grade` (`grade`);

--
-- Index pour la table `etat_inscription`
--
ALTER TABLE `etat_inscription`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `statutdoctorant`
--
ALTER TABLE `statutdoctorant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `structure_recherche`
--
ALTER TABLE `structure_recherche`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acronyme` (`acronyme`);

--
-- Index pour la table `these`
--
ALTER TABLE `these`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_these_etat_inscription` (`EtatIsncription`),
  ADD KEY `FK_these_axe` (`axe`),
  ADD KEY `FK_these_doctorant` (`DoctorantID`),
  ADD KEY `FK_these_enseignant` (`EncadrantID`);

--
-- Index pour la table `typestructure`
--
ALTER TABLE `typestructure`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `axe`
--
ALTER TABLE `axe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT pour la table `doctorant`
--
ALTER TABLE `doctorant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT pour la table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `enseignant`
--
ALTER TABLE `enseignant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `etat_inscription`
--
ALTER TABLE `etat_inscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `grade`
--
ALTER TABLE `grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `statutdoctorant`
--
ALTER TABLE `statutdoctorant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `structure_recherche`
--
ALTER TABLE `structure_recherche`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `these`
--
ALTER TABLE `these`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT pour la table `typestructure`
--
ALTER TABLE `typestructure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
